import { Popup } from "react-leaflet";

type ShipMarkerPopupProps = {
  name: string;
  type: string;
  speed: number;
  status: string;
};

export default function ShipMarkerPopup({
  name,
  type,
  speed,
  status,
}: ShipMarkerPopupProps) {
  return (
    <Popup>
      <div>
        <strong>{name}</strong>
        <br />
        Type: {type}
        <br />
        Speed: {speed} kn
        <br />
        Status: {status}
      </div>
    </Popup>
  );
}
