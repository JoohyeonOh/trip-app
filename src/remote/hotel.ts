import {
  QuerySnapshot,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants";
import { Hotel } from "@/models/hotel";
import { Room } from "@/models/room";

export async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const docsRef = collection(store, COLLECTIONS.HOTEL);
  const hotelsQuery =
    pageParams == null
      ? query(docsRef, limit(10))
      : query(docsRef, startAfter(pageParams), limit(10));

  const hotelsSnapshot = await getDocs(hotelsQuery);

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

  return {
    items: items,
    lastVisible: lastVisible,
  };
}

export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id));

  return {
    id,
    ...snapshot.data(),
  } as Hotel;
}

export async function getRecommendHotels(hotelIds: string[]) {
  const ref = collection(store, COLLECTIONS.HOTEL);
  const recommendQuery = query(ref, where(documentId(), "in", hotelIds));

  const snapshot = await getDocs(recommendQuery);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );
}

export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
  const roomRef = doc(hotelRef, COLLECTIONS.ROOM, roomId);

  const hotelSnapshot = await getDoc(hotelRef);
  const roomSnapshot = await getDoc(roomRef);

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  };
}
