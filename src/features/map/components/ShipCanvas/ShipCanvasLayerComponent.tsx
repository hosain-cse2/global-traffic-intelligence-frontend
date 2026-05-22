import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { ShipCanvasLayer } from "./ShipCanvasLayer";
import type { Ship } from "../../types/ship";

type Props = {
  ships: Ship[];
};

export default function ShipCanvasLayerComponent({ ships }: Props) {
  const map = useMap();
  const layerRef = useRef<ShipCanvasLayer | null>(null);

  useEffect(() => {
    const layer = new ShipCanvasLayer({ ships });
    layerRef.current = layer;
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
    // Layer is created once per map; ship updates use setShips below.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ships intentionally omitted
  }, [map]);

  useEffect(() => {
    layerRef.current?.setShips(ships);
  }, [ships]);

  return null;
}
