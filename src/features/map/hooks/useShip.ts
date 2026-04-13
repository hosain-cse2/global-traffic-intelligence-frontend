import { getShips } from "@/services/vesselApi";
import { useQuery } from "@tanstack/react-query";

export const useGetShips = () => {
  return useQuery({
    queryKey: ["shipsData"],
    queryFn: () => getShips(),
    retry: false,
  });
};
