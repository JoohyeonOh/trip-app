import { getLikes, toggleLike } from "@/remote/like";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "@/hooks/auth/useUser";
import { Hotel } from "@/models/hotel";
import { useAlertContext } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";

function useLike() {
  const user = useUser();
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const client = useQueryClient();

  const { data } = useQuery(
    ["likes"],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: !!user,
    }
  );

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, "name" | "id" | "mainImageUrl"> }) => {
      if (!user) {
        throw new Error("로그인 필요");
      }
      return toggleLike({ userId: user.uid, hotel });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["likes"]);
        // refetch() 도 가능한데 무슨 차이일까?
      },
      onError: (e: Error) => {
        if (e.message === "로그인 필요") {
          open({
            title: "로그인이 필요한 기능입니다.",
            onButtonClick: () => navigate("/signin"),
          });

          return;
        }

        open({
          title: "알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요",
          onButtonClick: () => {},
        });
      },
    }
  );

  return { data, mutate };
}

export default useLike;
