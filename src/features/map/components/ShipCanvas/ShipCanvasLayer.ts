import L from "leaflet";
import type { Ship } from "../../types/ship";
import { getShipColor } from "../VesselMap/VesselMapHelper";
import "./ShipCanvasLayer.css";

type ShipCanvasLayerOptions = L.LayerOptions & {
  ships?: Ship[];
  onShipClick?: (ship: Ship) => void;
  onShipDeselect?: () => void;
};

export class ShipCanvasLayer extends L.Layer {
  private mapInstance!: L.Map;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private ships: Ship[] = [];
  private animationFrameId: number | null = null;
  private hoveredShip: Ship | null = null;
  private selectedMmsi: string | null = null;
  private onShipClick?: (ship: Ship) => void;
  private onShipDeselect?: () => void;

  constructor(options: ShipCanvasLayerOptions = {}) {
    super(options);
    this.ships = options.ships ?? [];
    this.onShipClick = options.onShipClick;
    this.onShipDeselect = options.onShipDeselect;
  }

  onAdd(map: L.Map): this {
    this.mapInstance = map;

    this.canvas = L.DomUtil.create(
      "canvas",
      "leaflet-ship-canvas",
    ) as HTMLCanvasElement;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2D canvas context");
    }
    this.ctx = context;

    // this.canvas.style.pointerEvents = "none";

    const pane = map.getPanes().overlayPane;
    pane.appendChild(this.canvas);

    this.resizeCanvas();
    this.updateCanvasPosition();
    this.redraw();

    map.on("move", this.handleMoveOrZoom, this);
    map.on("zoom", this.handleMoveOrZoom, this);
    map.on("resize", this.handleResize, this);

    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseleave", this.onMouseLeave);
    this.canvas.addEventListener("click", this.onClick);

    return this;
  }

  onRemove(map: L.Map): this {
    map.off("move", this.handleMoveOrZoom, this);
    map.off("zoom", this.handleMoveOrZoom, this);
    map.off("resize", this.handleResize, this);

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseleave", this.onMouseLeave);
    this.canvas.removeEventListener("click", this.onClick);

    return this;
  }

  setSelectedMmsi(mmsi: string | null) {
    if (this.selectedMmsi === mmsi) return;
    this.selectedMmsi = mmsi;
    this.redraw();
  }

  private findShipAt(mouseX: number, mouseY: number): Ship | null {
    if (!this.mapInstance) return null;

    const hitSize = 8;

    for (const ship of this.ships) {
      const lat = ship.position?.latitude;
      const lng = ship.position?.longitude;

      if (lat == null || lng == null) continue;

      const point = this.mapInstance.latLngToContainerPoint([lat, lng]);

      if (
        mouseX >= point.x - hitSize &&
        mouseX <= point.x + hitSize &&
        mouseY >= point.y - hitSize &&
        mouseY <= point.y + hitSize
      ) {
        return ship;
      }
    }

    return null;
  }

  private getMousePosition(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  private onMouseMove = (e: MouseEvent) => {
    const { x, y } = this.getMousePosition(e);
    const foundShip = this.findShipAt(x, y);

    if (this.hoveredShip !== foundShip) {
      this.hoveredShip = foundShip;
      this.canvas.style.cursor = foundShip ? "pointer" : "";
      this.redraw();
    }
  };

  private onClick = (e: MouseEvent) => {
    const { x, y } = this.getMousePosition(e);
    const foundShip = this.findShipAt(x, y);

    if (foundShip) {
      this.onShipClick?.(foundShip);
      return;
    }

    this.onShipDeselect?.();
  };

  private onMouseLeave = () => {
    if (this.hoveredShip) {
      this.hoveredShip = null;
      this.canvas.style.cursor = "";
      this.redraw();
    }
  };

  setShips(ships: Ship[]) {
    this.ships = ships;
    this.scheduleDraw();
  }

  private handleMoveOrZoom() {
    this.scheduleDraw();
  }

  private handleResize() {
    this.resizeCanvas();
    this.scheduleDraw();
  }

  private scheduleDraw() {
    if (this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      this.updateCanvasPosition();
      this.redraw();
    });
  }

  private resizeCanvas() {
    const size = this.mapInstance.getSize();

    this.canvas.width = size.x;
    this.canvas.height = size.y;
    this.canvas.style.width = `${size.x}px`;
    this.canvas.style.height = `${size.y}px`;
  }

  private updateCanvasPosition() {
    const topLeft = this.mapInstance.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this.canvas, topLeft);
  }

  private redraw() {
    if (!this.mapInstance) return;

    const size = this.mapInstance.getSize();
    this.ctx.clearRect(0, 0, size.x, size.y);

    for (const ship of this.ships) {
      const lat = ship.position?.latitude;
      const lng = ship.position?.longitude;

      if (lat == null || lng == null) continue;

      const point = this.mapInstance.latLngToContainerPoint([lat, lng]);

      if (
        point.x < -20 ||
        point.y < -20 ||
        point.x > size.x + 20 ||
        point.y > size.y + 20
      ) {
        continue;
      }

      const isHovered = this.hoveredShip?.mmsi === ship.mmsi;
      const isSelected = this.selectedMmsi === ship.mmsi;

      this.drawShip(
        point.x,
        point.y,
        ship.position?.heading ?? 0,
        getShipColor(ship.type),
        isHovered,
        isSelected,
      );
    }
  }

  private drawShip(
    x: number,
    y: number,
    heading: number,
    color: string,
    isHovered: boolean,
    isSelected: boolean,
  ) {
    const rad = (heading * Math.PI) / 180;

    if (isSelected) {
      this.ctx.save();
      this.ctx.strokeStyle = "#2563eb";
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([]);
      this.ctx.strokeRect(x - 16, y - 16, 32, 32);
      this.ctx.restore();
    } else if (isHovered) {
      this.ctx.save();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([6, 1]);
      this.ctx.strokeRect(x - 15, y - 15, 30, 30);
      this.ctx.restore();
    }

    // draw rotated ship
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rad);

    this.ctx.strokeStyle = "#334155";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -8);
    this.ctx.lineTo(5, 8);
    this.ctx.lineTo(0, 5);
    this.ctx.lineTo(-5, 8);
    this.ctx.closePath();

    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }
}
