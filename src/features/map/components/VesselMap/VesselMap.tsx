import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ShipMarker from "../ShipMarker/ShipMarker";
// import ShipMarkerPopup from "../ShipMarkerPopup/ShipMarkerPopup";
import { getShipColor } from "./VesselMapHelper";
import { useGetShips } from "../../hooks/useShip";
import { memo } from "react";

const VesselMap = () => {
  const position: [number, number] = [48.137154, 11.576124]; // TODO: Get actual position from user location
  const { data: ships, isLoading, isFetched, isError, error } = useGetShips();

  const isReady = isFetched && !isLoading;

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
        zoomSnap={0.1} // 👈 allows fractional zoom levels
        zoomDelta={0.1} // 👈 how much each zoom step changes
        wheelPxPerZoomLevel={1000} // 👈 controls scroll sensitivity
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap & CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {isReady &&
          ships?.map((ship) => {
            if (!ship.position) return null;

            return (
              <ShipMarker
                key={ship.mmsi}
                latitude={ship.position?.latitude}
                longitude={ship.position?.longitude}
                color={getShipColor(ship.type)}
                heading={ship.position?.heading}
              />
            );
          })}
      </MapContainer>
    </div>
  );
};

export default memo(VesselMap);
