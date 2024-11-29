import { fetchDataWithUrl } from "services/api";

export default function handler(req, res) {
  (async () => {
    try {
      var lat = req.query.lat;
      var lon = req.query.lon;
      let url = `https://us1.locationiq.com/v1/reverse.php?key=71dce42b0a2a23&lat=${lat}&lon=${lon}&format=json`;

      let response = await fetchDataWithUrl(url, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      });
     
      let address = response.data.address;
      let locationDetail = {
        location_field:response.data.display_name,
        sublocality_level_1: address.residential,
        locality: address.city,
        district: address.state_district,
        division: "",
        state_short: "",
        state: address.state,
        country_short: address.country_code,
        country: address.country,
        postal_code: address.postcode,
        location: {
          lat: response.data.lat,
          lng: response.data.lon,
        },
      };

      res.status(200).json({ status: 200, data: locationDetail });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, message: error.message });
    }
  })();
}
