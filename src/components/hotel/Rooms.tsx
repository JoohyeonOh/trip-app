import qs from "qs";
import useRooms from "./hooks/useRooms";
import styled from "@emotion/styled";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import ListRow from "@shared/ListRow";
import Button from "@shared/Button";
import addDelimeter from "@/utils/addDelimeter";
import { css } from "@emotion/react";
import Tag from "@shared/Tag";
import Spacing from "@shared/Spacing";
import useUser from "@/hooks/auth/useUser";
import { useAlertContext } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";

function Rooms({ hotelId }: { hotelId: string }) {
  const user = useUser();
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const { data } = useRooms({ hotelId });

  return (
    <Container>
      <HeaderFlex justify="space-between" align="center">
        <Text bold typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금포함
        </Text>
      </HeaderFlex>
      <ul>
        {data?.map((room) => {
          const 마감임박인가 = room.availableCount === 1;
          const 매진인가 = room.availableCount === 0;

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            { addQueryPrefix: true }
          );

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={room.roomName}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {마감임박인가 ? (
                        <>
                          <Spacing direction="horizontal" size={7} />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimeter(room.price)}원 / `.concat(
                    room.refundable ? "환불가능" : "환불불가"
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={매진인가}
                  onClick={() => {
                    if (!user) {
                      open({
                        title: "로그인이 필요한 기능입니다.",
                        onButtonClick: () => {
                          navigate("/signin");
                        },
                      });
                      return;
                    }

                    navigate(`/schedule${params}`);
                  }}
                >
                  {매진인가 ? "매진" : "선택"}
                </Button>
              }
            />
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 0;
`;

const HeaderFlex = styled(Flex)`
  padding: 0 24px;
`;

const imageStyles = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export default Rooms;
