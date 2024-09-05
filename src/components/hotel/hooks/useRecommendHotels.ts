import { getRecommendHotels } from "@/remote/hotel";
import { useQuery } from "react-query";

function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery(
    ["recoomendHotels", JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    { enabled: hotelIds.length > 0 }
  );
}

export default useRecommendHotels;
