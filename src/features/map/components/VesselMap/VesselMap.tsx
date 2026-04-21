import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useGetShips } from "../../hooks/useShip";
import { memo } from "react";

import ShipCanvasLayerComponent from "../ShipCanvas/ShipCanvasLayerComponent";
import styles from "./VesselMap.module.css";

const VesselMap = () => {
  const position: [number, number] = [48.137154, 11.576124]; // TODO: Get actual position from user location
  const { data: ships, isLoading, isFetched, isError, error } = useGetShips();

  const isReady = isFetched && !isLoading;

  if (isReady && isError) {
    return <div>Error loading ships: {error?.message}</div>;
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={3}
        zoomSnap={0.1} // 👈 allows fractional zoom levels
        zoomDelta={0.1} // 👈 how much each zoom step changes
        wheelPxPerZoomLevel={30} // 👈 controls scroll sensitivity
        zoomAnimation={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap & CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* {isReady &&
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
          })} */}
        <ShipCanvasLayerComponent ships={ships ?? []} />
      </MapContainer>
    </div>
  );
};

export default memo(VesselMap);
