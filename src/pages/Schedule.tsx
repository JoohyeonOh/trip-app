import FixedBottomButton from "@/components/shared/FixedBottomButton";
import RangePicker from "@/components/shared/RangePicker";
import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SchedulePage() {
  const navigate = useNavigate();

  const { roomId = "", hotelId = "" } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string };

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  });

  // 혹시 쿼리가 유실 되는 경우 핸들링
  useEffect(() => {
    if (roomId === "" || hotelId === "") {
      window.history.back();
    }
  }, [roomId, hotelId]);

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      {
        addQueryPrefix: true,
      }
    );

    navigate(`/reservation${params}`);
  };

  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null;

  const buttonLabel = `${selectedDate.startDate} - ${selectedDate.endDate} ${selectedDate.nights}일`;

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          console.log("사용처", dateRange);

          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          });
        }}
      />
      {제출가능한가 && (
        <FixedBottomButton
          label={buttonLabel}
          onClick={moveToReservationPage}
        />
      )}
    </div>
  );
}

export default SchedulePage;
