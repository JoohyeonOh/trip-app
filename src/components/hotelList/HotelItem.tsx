import { differenceInMilliseconds, parseISO } from "date-fns";
import { Hotel, Hotel as HotelType } from "@/models/hotel";
import ListRow from "../shared/ListRow";
import Text from "../shared/Text";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { css } from "@emotion/react";
import addDelimeter from "@/utils/addDelimeter";
import Tag from "../shared/Tag";
import formatTime from "@/utils/formatTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";

interface HotelProps {
  hotel: HotelType;
  isLike: boolean;
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, "name" | "id" | "mainImageUrl">;
  }) => void;
}

function HotelItem({ hotel, isLike, onLike }: HotelProps) {
  const [remainedTime, setRemainedTime] = useState(0);

  const { name, comment, starRating, mainImageUrl, price } = hotel;

  useEffect(() => {
    if (!hotel.events || !hotel.events.promoEndTime) return;

    const promoEndTime = hotel.events.promoEndTime;

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date()
      );

      if (남은초 < 0) {
        clearInterval(timer);
        return;
      }

      setRemainedTime(남은초);
    }, 1_000);

    return () => {
      clearInterval(timer);
    };
  }, [hotel.events]);

  const tagComponent = () => {
    if (hotel.events == null) return null;

    const { name, tagThemeStyle } = hotel.events;

    const promotionText =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : "";

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    );
  };

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    onLike({
      hotel: {
        id: hotel.id,
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
      },
    });
  };

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          style={listRowStyles}
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={name} subTitle={comment} />
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {starRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex
              direction="column"
              align="flex-end"
              style={{ position: "relative" }}
            >
              <img
                src={
                  isLike
                    ? "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
                    : "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/heart-512.png"
                }
                alt="heart-icon"
                css={iconHeartStyles}
                onClick={handleLike}
              />
              <img src={mainImageUrl} alt="hotel-image" css={imageStyles} />
              <Spacing size={8} />
              <Text bold>{addDelimeter(price)}원</Text>
            </Flex>
          }
        />
      </Link>
    </div>
  );
}

const listRowStyles = css`
  align-items: flex-start;
`;

const imageStyles = css`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`;

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  z-index: 10;
`;

export default HotelItem;
