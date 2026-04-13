import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ShipMarker from "../ShipMarker/ShipMarker";
import ShipMarkerPopup from "../ShipMarkerPopup/ShipMarkerPopup";
import { getShipColor } from "./VesselMapHelper";
import { useGetShips } from "../../hooks/useShip";
import { useMemo } from "react";

export default function VesselMap() {
  const position: [number, number] = [48.137154, 11.576124]; // TODO: Get actual position from user location
  const { data: ships, isLoading, isFetched, isError, error } = useGetShips();

  const isReady = useMemo(
    () => isFetched && !isLoading,
    [isFetched, isLoading],
  );

  if (isReady && isError) {
    return <div>Error loading ships: {error?.message}</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <MapContainer
        center={position}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap & CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {isReady &&
          ships?.map((ship) => (
            <ShipMarker
              key={ship.id}
              position={[ship.lat, ship.lng]}
              color={getShipColor(ship.type)}
              heading={ship.heading}
            >
              <ShipMarkerPopup
                name={ship.name}
                type={ship.type}
                speed={ship.speed}
                status={ship.status}
              />
            </ShipMarker>
          ))}
      </MapContainer>
    </div>
  );
}
