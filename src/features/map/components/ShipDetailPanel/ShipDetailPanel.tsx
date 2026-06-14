import type { Ship } from "../../types/ship";
import styles from "./ShipDetailPanel.module.css";

type Props = {
  ship: Ship;
  onClose: () => void;
};

function formatCoord(value: number | undefined, positive: string, negative: string) {
  if (value == null) return "—";
  const dir = value >= 0 ? positive : negative;
  return `${Math.abs(value).toFixed(4)}° ${dir}`;
}

function formatNumber(value: number | undefined, unit: string) {
  if (value == null) return "—";
  return `${value.toFixed(1)} ${unit}`;
}

export default function ShipDetailPanel({ ship, onClose }: Props) {
  const { position } = ship;

  return (
    <aside className={styles.panel} aria-label="Ship details">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{ship.shipName || "Unknown vessel"}</h2>
          <p className={styles.subtitle}>MMSI {ship.mmsi}</p>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close ship details"
        >
          ×
        </button>
      </div>

      <dl className={styles.details}>
        <div className={styles.row}>
          <dt>Type</dt>
          <dd>{ship.type ?? "Unknown"}</dd>
        </div>
        <div className={styles.row}>
          <dt>Last update</dt>
          <dd>{ship.timestamp ? new Date(ship.timestamp).toLocaleString() : "—"}</dd>
        </div>
        <div className={styles.row}>
          <dt>Latitude</dt>
          <dd>{formatCoord(position?.latitude, "N", "S")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Longitude</dt>
          <dd>{formatCoord(position?.longitude, "E", "W")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Speed</dt>
          <dd>{formatNumber(position?.sog, "kn")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Course</dt>
          <dd>{formatNumber(position?.cog, "°")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Heading</dt>
          <dd>{formatNumber(position?.heading, "°")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Status</dt>
          <dd>{position?.navStatus ?? "—"}</dd>
        </div>
      </dl>
    </aside>
  );
}
