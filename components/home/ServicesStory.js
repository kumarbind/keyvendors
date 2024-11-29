import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Title from "components/style/Title";
import Slider from "react-slick";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ServicesStory({ title, services }) {
 
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <>
      {services!==null && (
        <Box sx={{ m: 5 }}>
          <Title title={title} />
          <Slider {...settings}>
            {services.map((card, index) => (
              <div key={index}>
                <Card
                  raised
                  sx={{
                    height: "100%",
                    maxWidth: 320,
                    margin: "0 auto",
                    padding: "0.1em",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <CardMedia
                    height="250"
                    component="img"
                    image={card.image}
                    alt={card.title}
                    sx={{ padding: "1em 1em 0 1em" }}
                  />
                  <CardContent>
                    <Typography variant="body2" component="div">
                      {card.title}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </Box>
      )}
    </>
  );
}
