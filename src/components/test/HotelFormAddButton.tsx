import { collection, getDocs, writeBatch } from "firebase/firestore";
import Button from "../shared/Button";
import { store } from "@/remote/firebase";
import { COLLECTIONS } from "@/constants";
import { FORMS } from "@/mock/data";

function HotelFormAddButton() {
  const handleClick = async () => {
    const batch = writeBatch(store);
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL));
    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      });
    });

    await batch.commit();

    alert("폼 데이터 추가 완료!");
  };

  return <Button onClick={handleClick}>폼 데이터 추가</Button>;
}

export default HotelFormAddButton;
