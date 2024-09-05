import Form from "@/components/reservation/Form";
import Summary from "@/components/reservation/Summary";
import useReservation from "@/components/reservation/hooks/useReservation";
import Spacing from "@/components/shared/Spacing";
import useUser from "@/hooks/auth/useUser";
import addDelimeter from "@/utils/addDelimeter";
import { parse } from "qs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReservationPage() {
  const user = useUser();
  const navigate = useNavigate();

  const { hotelId, roomId, startDate, endDate, nights } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    }
  ) as {
    hotelId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    nights: string;
  };

  useEffect(() => {
    if (
      [user, hotelId, roomId, startDate, endDate, nights].some((param) => {
        return param == null;
      })
    ) {
      window.history.back();
    }
  }, [user, hotelId, roomId, startDate, endDate, nights]);

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  });

  if (!data || isLoading) {
    return null;
  }

  const { hotel, room } = data;

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    console.log(formValues);
    const newReservation = {
      userId: user?.uid as string,
      hotelId: hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };
    await makeReservation(newReservation);
    navigate(`/reservation/done?hotelName=${hotel.name}`);
  };

  const buttonLabel = `${nights}박 ${addDelimeter(
    room.price * Number(nights)
  )}원 예약하기`;

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  );
}

export default ReservationPage;
