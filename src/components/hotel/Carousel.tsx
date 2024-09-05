import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { css } from "@emotion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={imageUrl}>
            <LazyLoadImage
              src={imageUrl}
              alt={`${idx}번째 호텔이미지`}
              css={imageStyles}
              height={300} // 이미지를 그리기 전에 높이 값이 없으면 들썩일 수 있어서 맞춰줌
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
  overflow: hidden;
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  overflow: hidden;
`;

export default Carousel;
