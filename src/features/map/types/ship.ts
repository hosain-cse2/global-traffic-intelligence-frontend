export type Ship = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  heading: number; // direction (0–360)
  speed: number; // knots
  course: number; // course over ground
  type: string; // cargo, tanker, etc.
  status: string; // underway, anchored, etc.
  length: number; // meters
  width: number; // meters
  mmsi: string; // unique ship id
};
