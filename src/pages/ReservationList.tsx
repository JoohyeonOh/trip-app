import useReservations from "@/components/reservation-list/hooks/useReservations";
import ListRow from "@/components/shared/ListRow";

function ReservationListPage() {
  const { data, isLoading } = useReservations();

  if (data == null || isLoading) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <ul>
        {data.map(({ reservation, hotel }) => (
          <ListRow
            key={reservation.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={`${hotel.name}의 이미지`}
                width={80}
                height={80}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${reservation.startDate} - ${reservation.endDate} ${reservation.price}원`}
              />
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationListPage;
