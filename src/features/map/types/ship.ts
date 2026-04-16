type ShipMetadata = {
  mmsi: string;
  shipName: string;
  timestamp: string;
};

type ShipPosition = {
  latitude: number;
  longitude: number;
  sog?: number; // speed over ground
  cog?: number; // course over ground
  heading?: number;
  navStatus?: string;
};

type Ship = ShipMetadata & {
  type?: string;
  position?: ShipPosition;
};

export type { Ship, ShipMetadata, ShipPosition };
