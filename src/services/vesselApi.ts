import type { Ship } from "@/features/map/types/ship";
import { apiClient } from "@/lib/apiClient";

type ShipResponse = {
  mmsi: string;
  latitude: number;
  longitude: number;
  sog: number; // speed over ground
  cog: number; // course over ground
  heading: number;
  navStatus: number;
  shipName: string;
  timestamp: string;
};

export const shipMapper = (shipResponse: ShipResponse): Ship => {
  return {
    id: shipResponse.mmsi,
    name: shipResponse.shipName,
    lat: shipResponse.latitude,
    lng: shipResponse.longitude,
    heading: shipResponse.heading,
    course: shipResponse.cog,
    speed: shipResponse.sog,
    type: shipResponse.navStatus === 1 ? "cargo" : "tanker",
    status: shipResponse.navStatus === 1 ? "underway" : "anchored",
    length: 0,
    width: 0,
    mmsi: shipResponse.mmsi,
  };
};
export async function getShips(): Promise<Ship[]> {
  const shipResponse = await apiClient.get<ShipResponse[]>(
    "/api/aisstream/ships",
  );
  if (!shipResponse) {
    throw new Error("No ships found");
  }
  return shipResponse.map(shipMapper);
}
