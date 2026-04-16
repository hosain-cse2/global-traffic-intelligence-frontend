import { getShips } from "@/services/vesselApi";
import { useQuery } from "@tanstack/react-query";
import type { Ship } from "../types/ship";
import type { UseQueryResult } from "@tanstack/react-query";

export const useGetShips = (): UseQueryResult<Ship[], Error> => {
  return useQuery({
    queryKey: ["shipsData"],
    queryFn: () => getShips(),
    retry: false,
  });
};
