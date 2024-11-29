import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ShadowTitle from "components/style/ShadowTitle";
import Title from "components/style/Title";
import Slider from "react-slick";
import ImageWithFallback from "components/style/ImageWithFallback";
export default function Offers({ offers }) {
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <Box>
      <ShadowTitle title="Our Offers" />
      <Title title="Our Offers" />
      <Box>
        <Slider {...settings}>
          {offers.map((offer, index) => (
            <Box key={index}>
              <Card
                raised
                sx={{
                  maxWidth: 320,
                  margin: "0 auto",
                  padding: "0.1em",
                  display: "flex",
                  flexDirection: "column",
                  background: "none",
                  boxShadow: "none",
                  borderRadius: "10px",
                }}>
                <ImageWithFallback                  
                  src={offer.image}
                  alt={offer.title}
                  height="200"
                  width="316"
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
