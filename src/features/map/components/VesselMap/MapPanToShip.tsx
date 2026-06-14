import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Ship } from "../../types/ship";

type Props = {
  ship: Ship | null;
};

export default function MapPanToShip({ ship }: Props) {
  const map = useMap();

  useEffect(() => {
    const lat = ship?.position?.latitude;
    const lng = ship?.position?.longitude;
    if (lat == null || lng == null) return;

    map.panTo([lat, lng], { animate: true });
  }, [ship?.mmsi, map, ship?.position?.latitude, ship?.position?.longitude]);

  return null;
}
