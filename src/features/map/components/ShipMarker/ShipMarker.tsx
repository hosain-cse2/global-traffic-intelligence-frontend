import { Marker } from "react-leaflet";
import { createShipIcon } from "./ShipMarkerHelper";
import type ShipMarkerPopup from "../ShipMarkerPopup/ShipMarkerPopup";
import type { ReactElement } from "react";

type ShipMarkerProps = {
  position: [number, number];
  heading?: number;
  color?: string;
  isSelected?: boolean;
  size?: number;
  children?: ReactElement<typeof ShipMarkerPopup>;
};

export default function ShipMarker({
  position,
  heading,
  color,
  isSelected,
  size,
  children,
}: ShipMarkerProps) {
  return (
    <Marker
      position={position}
      icon={createShipIcon({
        heading,
        color,
        isSelected,
        size,
      })}
    >
      {children}
    </Marker>
  );
}
