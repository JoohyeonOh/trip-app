import useUser from "@/hooks/auth/useUser";
import { getReservations } from "@/remote/reservation";
import { useQuery } from "react-query";

function useReservations() {
  const user = useUser();

  const { data, isLoading } = useQuery(
    ["reservation-list", user?.uid],
    () => getReservations({ userId: user?.uid as string }),
    {
      enabled: !!user,
    }
  );

  return { data, isLoading };
}

export default useReservations;
