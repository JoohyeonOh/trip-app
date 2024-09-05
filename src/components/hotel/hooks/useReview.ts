import useUser from "@/hooks/auth/useUser";
import { getReviews, removeReview, writeReview } from "@/remote/review";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser();
  const client = useQueryClient();

  const { data, isLoading } = useQuery(["review", hotelId], () =>
    getReviews({ hotelId })
  );

  //mutateAsync는 프로미스를 반환하기 때문에 사용처에서 흐름을 제어할 수 있게 된다.
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text: text,
      };

      await writeReview(newReview);

      return true;
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["review", hotelId]);
      },
    }
  );

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["review", hotelId]);
      },
    }
  );

  return { data, isLoading, write, remove };
}

export default useReview;
