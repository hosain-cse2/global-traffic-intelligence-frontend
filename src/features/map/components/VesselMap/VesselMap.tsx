import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ShipMarker from "../ShipMarker/ShipMarker";
import { ships } from "@/data/ship";
import ShipMarkerPopup from "../ShipMarkerPopup/ShipMarkerPopup";
import { getShipColor } from "./VesselMapHelper";

export default function VesselMap() {
  const position: [number, number] = [48.137154, 11.576124];
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
        {ships.map((ship) => (
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
