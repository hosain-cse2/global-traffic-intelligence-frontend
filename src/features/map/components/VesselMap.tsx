import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
        {/* 
        // TODO: Add MapTiler tile layer later or remove it completely
        <TileLayer
          attribution="&copy; MapTiler"
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
        /> 
        */}

        <TileLayer
          attribution="&copy; OpenStreetMap & CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>Hello from Munich</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
