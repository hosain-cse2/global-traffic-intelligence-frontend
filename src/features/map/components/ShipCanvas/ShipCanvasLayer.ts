import L from "leaflet";
import type { Ship } from "../../types/ship";
import { getShipColor } from "../VesselMap/VesselMapHelper";
import "./ShipCanvasLayer.css";

type ShipCanvasLayerOptions = L.LayerOptions & {
  ships?: Ship[];
};

export class ShipCanvasLayer extends L.Layer {
  private mapInstance!: L.Map;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private ships: Ship[] = [];
  private animationFrameId: number | null = null;

  constructor(options: ShipCanvasLayerOptions = {}) {
    super(options);
    this.ships = options.ships ?? [];
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

    this.canvas.style.pointerEvents = "none";

    const pane = map.getPanes().overlayPane;
    pane.appendChild(this.canvas);

    this.resizeCanvas();
    this.updateCanvasPosition();
    this.redraw();

    map.on("move", this.handleMoveOrZoom, this);
    map.on("zoom", this.handleMoveOrZoom, this);
    map.on("resize", this.handleResize, this);

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

    return this;
  }

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

      this.drawShip(
        point.x,
        point.y,
        ship.position?.heading ?? 0,
        getShipColor(ship.type),
      );
    }
  }

  private drawShip(x: number, y: number, heading: number, color: string) {
    const rad = (heading * Math.PI) / 180;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rad);

    this.ctx.beginPath();
    this.ctx.moveTo(0, -10);
    this.ctx.lineTo(6, 8);
    this.ctx.lineTo(0, 4);
    this.ctx.lineTo(-6, 8);
    this.ctx.closePath();

    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.restore();
  }
}
