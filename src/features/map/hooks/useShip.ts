import { getShips } from "@/services/vesselApi";
import { useQuery } from "@tanstack/react-query";
import type { Ship } from "../types/ship";
import type { UseQueryResult } from "@tanstack/react-query";

export const useGetShips = (): UseQueryResult<Ship[], Error> => {
  return useQuery({
    queryKey: ["shipsData"],
    queryFn: () => getShips(),
    staleTime: Infinity, // data is always fresh → no refetch
    gcTime: Infinity, // keep in cache forever (v5) (v4: cacheTime)
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
