import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants";
import { Review } from "@/models/review";
import { User } from "@/models/user";

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
  const reviewSnapshot = await getDocs(
    query(
      collection(hotelRef, COLLECTIONS.REVIEW),
      orderBy("createdAt", "desc")
    )
  );

  const reviews = reviewSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate() as Date,
        // firebase에서 TimeStamp로 바꿔버리기 때문에 Date 타입으로 바꿔줘야한다.
      } as Review)
  );

  const userMap: { [key: string]: User } = {};
  const result: Array<Review & { user: User }> = [];

  // 유저 가져오기, 이미 가져온 유저는 캐싱 활용하기
  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId];

    if (캐시된유저 == null) {
      const userSnapshot = await getDoc(
        doc(store, COLLECTIONS.USER, review.userId)
      );
      const user = userSnapshot.data() as User;

      userMap[review.userId] = user;
      result.push({
        ...review,
        user: user,
      });
    } else {
      result.push({
        ...review,
        user: 캐시된유저,
      });
    }
  }

  return result;
}

export function writeReview(review: Omit<Review, "id">) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId);
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW));

  return setDoc(reviewRef, review);
}

export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string;
  hotelId: string;
}) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
  const reviewRef = doc(hotelRef, COLLECTIONS.REVIEW, reviewId);

  return deleteDoc(reviewRef);
}
