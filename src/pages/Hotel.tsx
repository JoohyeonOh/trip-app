import ActionButtons from "@/components/hotel/ActionButtons";
import Carousel from "@/components/hotel/Carousel";
import Contents from "@/components/hotel/Contents";
import Map from "@/components/hotel/Map";
import RecommendHotels from "@/components/hotel/RecommendHotels";
import Review from "@/components/hotel/Review";
import Rooms from "@/components/hotel/Rooms";
import useHotel from "@/components/hotel/hooks/useHotel";
import Top from "@/components/shared/Top";
import { useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";
import { css } from "@emotion/react";
import SEO from "@/components/shared/SEO";

function HotelPage() {
  const { id } = useParams() as { id: string };
  const { data: hotel, isLoading } = useHotel({ id });

  if (hotel == null || isLoading) {
    return <div>Loading...</div>;
  }

  console.log("hotel", hotel);

  const { name, comment, images, contents, location, recommendHotels } = hotel;

  return (
    <div>
      <SEO title={name} description={comment} image={images[0]} />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={hotel} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels hotelIds={recommendHotels} />
      <Review hotelId={id} />
    </div>
  );
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`;

export default HotelPage;
