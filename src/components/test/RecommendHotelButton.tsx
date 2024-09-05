import { collection, getDocs, writeBatch } from "firebase/firestore";
import Button from "../shared/Button";
import { store } from "@/remote/firebase";
import { COLLECTIONS } from "@/constants";

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    // 임의로 자신을 제외한 호텔 5개를 가져오게 한다.
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL));
    const batch = writeBatch(store);

    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = [];

      for (let doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) break;

        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id);
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      });
    });

    await batch.commit();
    alert("업데이트가 완료되었습니다.");
  };

  return <Button onClick={handleButtonClick}>추천 호텔 데이터 추가하기</Button>;
}

export default RecommendHotelButton;
