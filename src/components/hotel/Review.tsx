import { ChangeEvent, useCallback, useState } from "react";
import Text from "../shared/Text";
import useReview from "./hooks/useReview";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ListRow from "../shared/ListRow";
import { format } from "date-fns";
import Button from "../shared/Button";
import useUser from "@/hooks/auth/useUser";
import TextField from "../shared/TextField";

function Review({ hotelId }: { hotelId: string }) {
  const [text, setText] = useState<string>("");
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId });
  const user = useUser();

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex
          direction="column"
          align="center"
          style={{
            padding: "20px 0",
            margin: "40px 24px",
            border: "1px solid gray100",
            borderRadius: "8px",
          }}
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/review_notes_pencil_pen-64.png"
            alt="review"
            width={50}
            height={50}
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </Text>
        </Flex>
      );
    } else {
      return (
        <ul>
          {reviews?.map((review) => (
            <ListRow
              key={review.id}
              left={
                review.user.photoURL && (
                  <img
                    src={review.user.photoURL}
                    alt={review.user.displayName}
                    width={40}
                    height={40}
                  />
                )
              }
              contents={
                <ListRow.Texts
                  title={review.text}
                  subTitle={format(review.createdAt, "yyyy-MM-dd")}
                />
              }
              right={
                user?.uid === review.userId && (
                  <Button
                    onClick={() => {
                      remove({ reviewId: review.id, hotelId: review.hotelId });
                    }}
                  >
                    삭제
                  </Button>
                )
              }
            />
          ))}
        </ul>
      );
    }
  }, [reviews, user]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  if (isLoading) return null;

  return (
    <div style={{ margin: "40px 0" }}>
      <Text typography="t4" bold style={{ padding: "0 24px" }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user && (
        <Flex direction="column" style={{ padding: "10px 24px" }}>
          <TextField onChange={handleTextChange} value={text} />
          <Spacing size={10} />
          <Flex justify="flex-end">
            <Button
              disabled={text === ""}
              onClick={async () => {
                const success = await write(text);

                if (success === true) {
                  setText("");
                }
              }}
            >
              작성완료
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
}

export default Review;
