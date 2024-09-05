import { COLLECTIONS } from "@/constants";
import { doc, collection, getDocs } from "firebase/firestore";
import { store } from "./firebase";
import { Room } from "@/models/room";

export async function getRooms(hotelId: string) {
  const HotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
  const snapshot = await getDocs(collection(HotelRef, COLLECTIONS.ROOM));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }));
}
