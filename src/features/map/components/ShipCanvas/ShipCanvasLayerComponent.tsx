import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { ShipCanvasLayer } from "./ShipCanvasLayer";
import type { Ship } from "../../types/ship";

type Props = {
  ships: Ship[];
  selectedMmsi: string | null;
  onShipClick: (ship: Ship) => void;
  onShipDeselect: () => void;
};

export default function ShipCanvasLayerComponent({
  ships,
  selectedMmsi,
  onShipClick,
  onShipDeselect,
}: Props) {
  const map = useMap();
  const layerRef = useRef<ShipCanvasLayer | null>(null);

  useEffect(() => {
    const layer = new ShipCanvasLayer({ ships, onShipClick, onShipDeselect });
    layerRef.current = layer;
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
    // Layer is created once per map; ship updates use setShips below.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ships intentionally omitted
  }, [map, onShipClick, onShipDeselect]);

  useEffect(() => {
    layerRef.current?.setShips(ships);
  }, [ships]);

  useEffect(() => {
    layerRef.current?.setSelectedMmsi(selectedMmsi);
  }, [selectedMmsi]);

  return null;
}
