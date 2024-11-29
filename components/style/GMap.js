// @flow
import React ,{ useRef,useState,useEffect} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export function GMap() {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      <Map latitude={28.6349951} longitude={77.2885155} />
    </Wrapper>
  );
}

const Map = ({ latitude, longitude }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 11,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  return <div ref={ref} style={{ height: "100%", width: "100%" }} />;
};
