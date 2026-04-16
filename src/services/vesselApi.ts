import type { Ship } from "@/features/map/types/ship";
import { apiClient } from "@/lib/apiClient";

export async function getShips(): Promise<Ship[]> {
  const shipResponse = await apiClient.get<Ship[]>("/api/aisstream/ships");
  if (!shipResponse) {
    throw new Error("No ships found");
  }
  return shipResponse;
}
