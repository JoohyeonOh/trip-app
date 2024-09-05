import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Flex from "../shared/Flex";
import { Hotel } from "@/models/hotel";
import Text from "../shared/Text";
import { css } from "@emotion/react";

function Map({ location }: { location: Hotel["location"] }) {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location;

  console.log(directions);

  const center = { lat: y, lng: x };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  if (!isLoaded) return null;

  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t5">
        기본 정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "250px",
          margin: "16px 0",
          boxSizing: "border-box",
          borderRadius: "8px",
        }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
      <Text typography="t6">{directions}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
`;

export default Map;
