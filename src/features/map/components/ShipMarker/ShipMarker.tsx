import { Marker } from "react-leaflet";
import { createSimpleShipIcon } from "./ShipMarkerHelper";
import { memo, useMemo } from "react";

type ShipMarkerProps = {
  latitude: number;
  longitude: number;
  heading?: number;
  color?: string;
};

const ShipMarker = ({
  latitude,
  longitude,
  heading,
  color,
}: ShipMarkerProps) => {
  const position = useMemo<[number, number]>(
    () => [latitude, longitude],
    [latitude, longitude],
  );
  const icon = useMemo(
    () => createSimpleShipIcon({ heading, color }),
    [heading, color],
  );

  return <Marker position={position} icon={icon} />;
};

export default memo(ShipMarker);
