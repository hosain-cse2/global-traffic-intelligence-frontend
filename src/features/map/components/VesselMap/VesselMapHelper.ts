export const getShipColor = (type: string) => {
  switch (type) {
    case "cargo":
      return "#22c55e";
    case "tanker":
      return "#ef4444";
    case "passenger":
      return "#38bdf8";
    case "fishing":
      return "#f59e0b";
    default:
      return "#a78bfa";
  }
};
