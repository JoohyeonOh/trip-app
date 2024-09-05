import { Reservation } from "@/models/reservation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants";
import { Room } from "@/models/room";
import { getHotel } from "./hotel";

export async function makeReservation(newReservation: Reservation) {
  // 잔여객실이 이미 매진이 되었을 수 있기 때문에 잔여객실 숫자를 가져와야한다.
  const hotelRef = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId);
  const roomSnapshot = await getDoc(
    doc(hotelRef, COLLECTIONS.ROOM, newReservation.roomId)
  );

  const room = roomSnapshot.data() as Room;
  const 지금잔여객실수 = room.availableCount;

  if (지금잔여객실수 === 0) {
    throw new Error("no room");
  }

  // 두 프로미스가 동시에 이뤄져야할 때는 Promise.all로 할 수 있다.
  return Promise.all([
    await updateDoc(roomSnapshot.ref, {
      availableCount: 지금잔여객실수 - 1,
    }),
    await setDoc(
      doc(collection(store, COLLECTIONS.RESERVATION)),
      newReservation
    ),
  ]);
}

export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where("userId", "==", userId)
  );

  const reservationSnapshot = await getDocs(reservationQuery);

  const result = [];

  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    };

    const hotel = await getHotel(reservation.hotelId);

    result.push({
      reservation,
      hotel,
    });
  }

  return result;

  // 위처럼 for문으로 돌리면 비동기 작업이 완료될때까지 기다리기 때문에 배열의 순서를
  // 보장받을 수 있지만 느려질 수 있고, forEach는 병렬적으로 처리되기 때문에
  // 빠르지만 배열의 순서를 보장받을 수 없다고 한다.

  // reservationSnapshot.docs.forEach(async (doc) => {
  //   const reservation = {
  //     id: doc.id,
  //     ...(doc.data() as Reservation),
  //   };

  //   const hotel = await getHotel(doc.data().hotelId)

  //   result.push({
  //     reservation, hotel
  //   })
  // });
}
