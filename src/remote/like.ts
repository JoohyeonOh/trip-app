import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants";
import { Like } from "@/models/like";
import { Hotel } from "@/models/hotel";

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where("userId", "==", userId),
      orderBy("order", "asc")
    )
  );

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Like)
  );
}

export async function toggleLike({
  userId,
  hotel,
}: {
  userId: string;
  hotel: Pick<Hotel, "name" | "id" | "mainImageUrl">;
}) {
  const likeRef = collection(store, COLLECTIONS.LIKE);

  const snapshot = await getDocs(
    query(
      likeRef,
      where("userId", "==", userId),
      where("hotelId", "==", hotel.id)
    )
  );

  if (snapshot.docs.length > 0) {
    const removeTarget = snapshot.docs[0];
    const TargetOrder = removeTarget.data().order;

    const updateTargetSnapshot = await getDocs(
      query(
        likeRef,
        where("userId", "==", userId),
        where("order", ">", TargetOrder)
      )
    );

    if (updateTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref);
    } else {
      const batch = writeBatch(store);

      updateTargetSnapshot.docs.forEach(async (doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 });
      });

      await batch.commit();

      return deleteDoc(removeTarget.ref);
    }
  } else {
    const lastLikeSnapshot = await getDocs(
      query(
        likeRef,
        where("userId", "==", userId),
        orderBy("order", "desc"),
        limit(1)
      )
    );

    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order;

    const newLike = {
      userId,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      order: lastOrder + 1,
    };

    return await setDoc(doc(likeRef), newLike);
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store);

  likes.forEach((like) => {
    batch.update(doc(store, COLLECTIONS.LIKE, like.id), {
      order: like.order,
    });
  });

  return batch.commit();
}
