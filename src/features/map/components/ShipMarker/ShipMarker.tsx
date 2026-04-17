import { Marker } from "react-leaflet";
import { createShipIcon } from "./ShipMarkerHelper";
import type ShipMarkerPopup from "../ShipMarkerPopup/ShipMarkerPopup";
import { memo, useMemo, type ReactElement } from "react";

type ShipMarkerProps = {
  latitude: number;
  longitude: number;
  heading?: number;
  color?: string;
  isSelected?: boolean;
  size?: number;
  children?: ReactElement<typeof ShipMarkerPopup>;
};

const ShipMarker = ({
  latitude,
  longitude,
  heading,
  color,
  isSelected,
  size,
}: ShipMarkerProps) => {
  const position = useMemo<[number, number]>(
    () => [latitude, longitude],
    [latitude, longitude],
  );
  const icon = useMemo(
    () => createShipIcon({ heading, color, isSelected, size }),
    [heading, color, isSelected, size],
  );

  return <Marker position={position} icon={icon} />;
};

export default memo(ShipMarker);
