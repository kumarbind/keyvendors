import { fetchDataWithUrl } from "services/api";
const INVALID_REQUEST = ["REQUEST_DENIED", "INVALID_REQUEST"];
const FIELDS = ["name", "geometry", "address_components"];

export default function handler(req, res) {
  (async () => {
    try {
      let place_id = req.query.place_id;
      let location_field=req.query.location_field;

      let url = `https://maps.googleapis.com/maps/api/place/details/json`;
    
      let reqData={
        params:{
          place_id:place_id,
          key:process.env.GOOGLE_MAPS_API_KEY,
          fields:FIELDS,
          language:"en",
          type:"(regions)"
        }
      }
      const result = await fetchDataWithUrl(url,reqData);
      if (INVALID_REQUEST.includes(result.data.status)) {
        res.status(500).json({
          status: 500,
          message: result.data.error_message
            ? result.data.error_message
            : result.data.status,
        });
      } else {
        let addressComponents = result.data.result.address_components;
        let address = {};
        addressComponents.forEach((addressComponent) => {
          let type = "";
          switch (addressComponent.types[0]) {
            case "administrative_area_level_1":
              type = "state";
              address[type + "_short"] = addressComponent.short_name;
              break;
            case "administrative_area_level_2":
              type = "division";
              break;
            case "administrative_area_level_3":
              type = "district";
              break;
            case "country":
              type = "country";
              address[type + "_short"] = addressComponent.short_name;
              break;
            default:
              type = addressComponent.types[0];
              break;
          }
          return (address[type] = addressComponent.long_name);
        });
        address["location_field"]=location_field;
        address["location"] = result.data.result.geometry.location;
        res.status(200).json({ status: 200, data: address });
      }
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  })();
}
