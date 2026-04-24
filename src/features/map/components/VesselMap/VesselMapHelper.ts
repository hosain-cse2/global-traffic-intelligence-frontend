/** Matches dashboard pie movement slices — bright mid-tones only. */
export function getMovementStateColor(state?: string): string {
  switch (state?.toLowerCase()) {
    case "fast":
      return "#60a5fa";
    case "normal":
      return "#4ade80";
    case "slow":
      return "#fbbf24";
    case "stationary":
      return "#e879f9";
    default:
      return "#a78bfa";
  }
}

/** Vivid ship-type colors (no dark shades) — stays distinct per type. */
export const getShipColor = (type?: string) => {
  const t = type?.toLowerCase();
  switch (t) {
    case "cargo":
      return "#4ade80";
    case "tanker":
      return "#fb7185";
    case "passenger":
      return "#38bdf8";
    case "fishing":
      return "#facc15";
    case "sailing":
      return "#22d3d4";
    case "pleasure":
      return "#c084fc";
    case "tug":
      return "#fb923c";
    case "navy":
      return "#818cf8";
    case "other":
      return "#f472b6";
    default:
      return "#99f6e4";
  }
};
