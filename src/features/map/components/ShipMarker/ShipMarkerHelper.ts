import L from "leaflet";
import "./ShipMarkerIcon.css";

type ShipIconOptions = {
  heading?: number;
  color?: string;
};

export const createSimpleShipIcon = ({
  heading = 0,
  color = "#22c55e",
}: ShipIconOptions) => {
  return L.divIcon({
    className: "simple-ship-icon",
    html: `
      <div 
        class="simple-ship-marker"
        style="
          --ship-color: ${color};
          transform: rotate(${heading}deg);
        "
      ></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};
