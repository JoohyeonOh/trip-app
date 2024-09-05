import { getHotels } from "@/remote/hotel";
import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";

function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery([`hotels`], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => snapshot.lastVisible,
    suspense: true,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return null;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  // 어레이 안에 어레이 형태로 되어있는 데이터 구조를 flat화 해주는 방법
  const hotels = data?.pages.map(({ items }) => items).flat();

  return { data: hotels, loadMore, isFetching, hasNextPage };
}

export default useHotels;
