export interface Like {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelMainImageUrl: string;
  userId: string;
  order: number;
}

//원래는 hotelId만 가져오고 ID를 통해서 호텔 정보에 접근하는것이 맞지만
//실습 복잡도를 낮추기 위해서 넣었음
