import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import ShipCanvasLayerComponent from "../ShipCanvas/ShipCanvasLayerComponent";
import ShipDetailPanel from "../ShipDetailPanel/ShipDetailPanel";
import type { Ship } from "../../types/ship";
import MapPanToShip from "./MapPanToShip";
import styles from "./VesselMap.module.css";
import { useShipSocket } from "../../hooks/useShipSocket";
import Banner from "@/shared/components/Banner/Banner";

const VesselMap = () => {
  const position: [number, number] = [48.137154, 11.576124]; // TODO: Get actual position from user location

  const { ships, isReady, error, isDisconnected, isConnected } =
    useShipSocket();
  const [selectedMmsi, setSelectedMmsi] = useState<string | null>(null);
  const [socketState, setSocketState] = useState<
    "disconnected" | "reconnected" | null
  >(null);

  const selectedShip = useMemo(
    () => ships?.find((ship) => ship.mmsi === selectedMmsi) ?? null,
    [ships, selectedMmsi],
  );

  const handleShipClick = useCallback((ship: Ship) => {
    setSelectedMmsi(ship.mmsi);
  }, []);

  const handleShipDeselect = useCallback(() => {
    setSelectedMmsi(null);
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      // TODO: Need to find a better way to set state in effect
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSocketState("disconnected");
      return;
    }

    if (isConnected) {
      // TODO:  Need to find a better way to set state in effect
      setSocketState((prev) =>
        prev === "disconnected" ? "reconnected" : prev,
      );
    }
  }, [isConnected, isDisconnected]);

  useEffect(() => {
    if (socketState !== "reconnected") return;

    const timeoutId = window.setTimeout(() => {
      setSocketState(null);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [socketState]);

  if (!isReady) {
    return <div>Connecting to ship socket...</div>; // TODO: Add a loading state
  } else if (error) {
    return <div>Error loading ships: {error?.message}</div>; // TODO: Add a error state
  }

  return (
    <div className={styles.mapContainer}>
      {socketState && (
        <Banner
          state={socketState === "disconnected" ? "error" : "success"}
          message={
            socketState === "disconnected"
              ? "Live updates disconnected. Showing last known ship positions."
              : "Live updates reconnected."
          }
        />
      )}
      {selectedShip && (
        <ShipDetailPanel
          ship={selectedShip}
          onClose={() => setSelectedMmsi(null)}
        />
      )}
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
        <ShipCanvasLayerComponent
          ships={ships ?? []}
          selectedMmsi={selectedMmsi}
          onShipClick={handleShipClick}
          onShipDeselect={handleShipDeselect}
        />
        <MapPanToShip ship={selectedShip} />
      </MapContainer>
    </div>
  );
};

export default memo(VesselMap);
