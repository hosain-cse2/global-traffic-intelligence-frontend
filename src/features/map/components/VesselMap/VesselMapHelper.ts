export const getShipColor = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "cargo":
      return "#22c55e";
    case "tanker":
      return "#ef4444";
    case "passenger":
      return "#38bdf8";
    case "fishing":
      return "#f59e0b";
    case "sailing":
      return "#0d9488";
    case "pleasure":
      return "#a855f7";
    case "tug":
      return "#475569";
    default:
      return "#94a3b8";
  }
};
