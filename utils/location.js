
export function getCoordinates(callback) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    callback([lat, lng]);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  return navigator.geolocation.getCurrentPosition(success, error, options);
}

