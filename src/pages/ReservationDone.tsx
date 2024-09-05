import Button from "@/components/shared/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function ReservationDonePage() {
  const navigate = useNavigate();
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelName: string };

  return (
    <div>
      <Flex direction="column" align="center">
        <Spacing size={100} />
        <img
          src="https://cdn0.iconfinder.com/data/icons/summer-set-2/64/Air_plane-64.png"
          alt="예약 완료 이미지"
          width={70}
          height={70}
        />
        <Spacing size={15} />
        <Text bold typography="t4">
          {hotelName}
        </Text>
        <Text>예약이 완료되었습니다</Text>
        <Spacing size={20} />
        <Flex>
          <Button onClick={() => navigate("/")}>홈으로</Button>
          <Spacing direction="horizontal" size={5} />
          <Button onClick={() => navigate("/reservation/list")}>
            예약 리스트로
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default ReservationDonePage;
