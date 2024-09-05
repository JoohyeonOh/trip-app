import { css } from "@emotion/react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import useRecommendHotels from "./hooks/useRecommendHotels";
import ListRow from "../shared/ListRow";
import addDelimeter from "@/utils/addDelimeter";
import { useState } from "react";
import Button from "../shared/Button";

function RecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  const { data: hotels, isLoading } = useRecommendHotels({ hotelIds });
  const [showMore, setShowMore] = useState(false);

  if (!hotels || isLoading) return null;

  const 호텔리스트 =
    hotels.length < 3 || showMore ? hotels : hotels.slice(0, 3);

  return (
    <Flex direction="column">
      <Text bold typography="t4" css={containerStyles}>
        추천 호텔
      </Text>
      <ul>
        {호텔리스트?.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimeter(hotel.price)}원`}
              />
            }
          />
        ))}
        {hotels.length > 3 && !showMore && (
          <div css={containerStyles}>
            <Button weak full onClick={() => setShowMore(true)}>
              더보기
            </Button>
          </div>
        )}
      </ul>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
`;

const imageStyles = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export default RecommendHotels;
