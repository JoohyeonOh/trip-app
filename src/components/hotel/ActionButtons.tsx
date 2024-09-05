import useShare from "@/hooks/useShare";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Text from "../shared/Text";
import { Hotel } from "@/models/hotel";
import { css } from "@emotion/react";
import CopyToClipboard from "react-copy-to-clipboard";
import useLike from "@/hooks/like/useLike";

function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare();
  const { data: likes, mutate: like } = useLike();

  const isLike = Boolean(likes?.find((like) => hotel.id === like.hotelId));

  const { name, comment, mainImageUrl, id } = hotel;

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        iconUrl={
          isLike
            ? "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
            : "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/heart-512.png"
        }
        onClick={() => {
          like({
            hotel: {
              name,
              id,
              mainImageUrl,
            },
          });
        }}
      />
      <Button
        label="공유하기"
        iconUrl="https://cdn3.iconfinder.com/data/icons/social-network-flat-3/100/Kakao_Talk-64.png"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: "tripApp에서 보기",
          });
        }}
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => alert("링크가 복사되었습니다.")}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-2/24/copy-alt-512.png"
        />
      </CopyToClipboard>
    </Flex>
  );
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string;
  iconUrl: string;
  onClick?: () => void;
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="button-icon" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
  margin-top: 12px;
  cursor: pointer;

  * {
    flex: 1;
  }
`;

export default ActionButtons;
