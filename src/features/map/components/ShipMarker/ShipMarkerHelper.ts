import L from "leaflet";
import "./ShipMarkerIcon.css";

type ShipIconOptions = {
  heading?: number;
  color?: string;
  isSelected?: boolean;
  size?: number;
};

export const createShipIcon = ({
  heading = 0,
  color = "#22c55e",
  isSelected = false,
  size = 24,
}: ShipIconOptions) => {
  return L.divIcon({
    className: "ship-div-icon",
    html: `
        <div
            class="ship-marker ${isSelected ? "selected" : ""}"
            style="
            --ship-color: ${color};
            --ship-size: ${size}px;
            transform: rotate(${heading}deg);
            "
        >
            <div class="ship-hull"></div>
        </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
