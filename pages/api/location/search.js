import { fetchDataWithUrl } from "services/api";

export default function handler(req, res) {
  (async () => {
    try {
      var query = req.query.query;
   
      let url = `https://us1.locationiq.com/v1/autocomplete?key=71dce42b0a2a23&q=${query}&format=json`;

      let response = await fetchDataWithUrl(url, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      });
      res.status(200).json({ status: 200, data: response.data });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, message: error.message });
    }
  })();
}
