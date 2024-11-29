import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PasswordIcon from "@mui/icons-material/Password";
import { Box, Button, Grid, Typography, FormLabel } from "@mui/material";
import CartContainer from "components/cart/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, postFormData } from "services/api";
import {
  getAuthPartnerInfo,
  getAuthPartnerToken,
  updateInfo,
} from "../../store/authPartnerSlice";
import { TextField, InputAdornment } from "@mui/material";
import ImageWithFallback from "components/style/ImageWithFallback";
import { useEffect, useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SelectedDates from "./SelectedDates";
import { toastMessage } from "utils/utility";

function Profile() {
  const authInfo = useSelector(getAuthPartnerInfo);
  const authToken = useSelector(getAuthPartnerToken);
  const isDisabled = () => authInfo.badge >= 1;
  const [categories, setCategories] = useState([]);
  const [cityArea, setCityArea] = useState();
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: {
      value: authInfo.name,
    },
    email: {
      value: authInfo.email,
    },
    phone: {
      value: authInfo.phone,
    },
    city_id: {
      value: authInfo.city_id,
    },
    area_id: {
      value: authInfo.area_id,
    },
    profession: {
      value: authInfo.category ? authInfo.category.cid : "",
    },
    flat_building: {
      value: authInfo.flat_building,
    },
    location_field: {
      value: authInfo.location_field,
    },
    accept_order: {
      value: authInfo.accept_order,
    },
    not_available_dates: {
      value: authInfo.not_available_dates,
    },
    photo: {
      value: "",
    },
    password: {
      value: "",
    },
  });


  const handelSubmit = async () => {
    const formData = new FormData();
    Object.keys(userInfo).forEach((key) => {
      formData.append(
        key,
        (key === "not_available_dates")
          ? JSON.stringify(userInfo[key].value)
          : userInfo[key].value
      );
    });

    try {
      const rs = await postFormData("partner/updateProfile", formData, authToken);
      toastMessage("success", rs.message);
      dispatch(updateInfo(rs.user));
    } catch (error) {
      toastMessage("error", error.message);
      console.log(error);
    }
  };

  const handelUserInfo = (e) => {
    let { name, value } = e.target;
    if (name === "photo") {
      value = e.target.files[0];
    }
    setUserInfo({
      ...userInfo,
      [name]: {
        ...userInfo[name],
        value,
      },
    });
  };

  const cities = useMemo(
    () =>
      cityArea
        ? (() => {
            let city_list = [];
            cityArea.city.forEach((option) => {
              city_list.push({
                label: option.title,
                id: option.city_id,
              });
              if (option.city_id === authInfo.city_id) {
                setCity({
                  label: option.title,
                  id: option.city_id,
                });
              }
            });
            return city_list;
          })()
        : [],
    [cityArea, authInfo]
  );

  const areas = useMemo(
    () =>
      cityArea
        ? (() => {
            let area_list = [];
            cityArea.area.forEach((option) => {
              area_list.push({
                label: option.area_name,
                id: option.id,
              });

              if (parseInt(option.id) === parseInt(authInfo.area_id)) {
                setArea({
                  label: option.area_name,
                  id: option.id,
                });
              }
            });
            return area_list;
          })()
        : [],
    [cityArea, authInfo]
  );

  const handleAvailability = (availability) => {
    handelUserInfo({
      target: { name: "not_available_dates", value: availability },
    });
  };

  const getCategory = async () => {
    let res = await fetchData(`get_sub_category`);
    let catList = [];
    res.forEach((option) => {
      catList.push({
        label: option.title,
        id: option.cid,
      });

      if (authInfo.category && option.cid === authInfo.category.cid) {
        setCategory({
          label: option.title,
          id: option.cid,
        });
      }
    });
    setCategories(catList);
  };

  const getCityArea = async () => {
    let res = await fetchData("contact/info");
    setCityArea(res);
  };

  useEffect(() => {
    
    getCategory();
    getCityArea();
  }, []);

  return (
    <>
      <CartContainer sx={{ mt: 3, p: 3 }}>
        <Grid
          sx={{ display: "flex" }}
          direction={"row"}
          justifyContent="start"
          container>
          <Grid item xs={12}>
            {authInfo.status != 1 ? (
              <Box>
                <b>
                  This Account is Currently Suspendent. Contact Customer Care
                  Support.
                </b>
              </Box>
            ) : authInfo.name != "" && authInfo.badge == 0 ? (
              <Box>
                <b>Your profile is submitted for quality verification.</b>
                <br />
                Our team will go through your profile and get back to you in
                case of any queries. Thanks you for your patience.
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography component="div" variant="h6">
                {authInfo.photo && (
                  <Box>
                    <ImageWithFallback
                      src={`${process.env.CDN_URL}/uploads/technician/photo/${authInfo.photo}`}
                      width={25}
                      height={25}
                    />
                  </Box>
                )}
                {authInfo.name}
                {authInfo.badge == 1 && (
                  <ImageWithFallback
                    alt="Account Verified Normal Level"
                    src={`${process.env.CDN_URL}/public/images/icons/icon_document_unapproved.png`}
                    width={15}
                    height={15}
                  />
                )}
                {authInfo.badge == 2 && (
                  <ImageWithFallback
                    alt="Account Verified Expert Level"
                    src={`${process.env.CDN_URL}/public/images/icons/icon_document_approved.png`}
                    width={15}
                    height={15}
                  />
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
              spacing={2}
              sx={{ pt: 3 }}
              direction={"row"}
              justifyContent="start"
              container>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  required={true}
                  onChange={handelUserInfo}
                  defaultValue={authInfo.name}
                  fullWidth
                  disabled={isDisabled()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  onChange={handelUserInfo}
                  required={true}
                  variant="outlined"
                  type="email"
                  defaultValue={authInfo.email}
                  disabled={isDisabled()}
                  InputProps={{
                    shrink: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  onChange={handelUserInfo}
                  required={true}
                  variant="outlined"
                  defaultValue={authInfo.phone}
                  disabled={true}
                  InputProps={{
                    shrink: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  options={cities}
                  value={city}
                  onChange={(e, newValue) => {
                    setCity(newValue);
                    handelUserInfo({
                      target: { name: "city_id", value: newValue.id },
                    });
                  }}
                  disablePortal
                  id="city"
                  renderInput={(params) => (
                    <TextField
                      id="city_id"
                      name="city_id"
                      onChange={handelUserInfo}
                      label="Your city"
                      variant="outlined"
                      required={true}
                      disabled={isDisabled()}
                      fullWidth
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <Autocomplete
                  options={areas}
                  onChange={(e, newValue) => {
                    setArea(newValue);
                    handelUserInfo({
                      target: { name: "area_id", value: newValue.id },
                    });
                  }}
                  value={area}
                  disablePortal
                  id="area_id"
                  name="area_id"
                  renderInput={(params) => (
                    <TextField
                      id="area"
                      label="Area"
                      required={true}
                      variant="outlined"
                      disabled={isDisabled()}
                      fullWidth
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  options={categories}
                  value={category}
                  disablePortal
                  onChange={(e, newValue) => {
                    setCategory(newValue);
                    handelUserInfo({
                      target: { name: "profession", value: newValue.id },
                    });
                  }}
                  id="profession"
                  name="profession"
                  renderInput={(params) => (
                    <TextField
                      label="Profession"
                      variant="outlined"
                      required={true}
                      disabled={isDisabled()}
                      fullWidth
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="flat"
                  name="flat_building"
                  label="Flat/Building/Street"
                  variant="outlined"
                  onChange={handelUserInfo}
                  required={true}
                  defaultValue={authInfo.flat_building}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="location_field"
                  name="location_field"
                  onChange={handelUserInfo}
                  required={true}
                  label="Location"
                  variant="outlined"
                  defaultValue={authInfo.location_field}
                  InputProps={{
                    shrink: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="accentOrder" required={true}>
                    Accent Order
                  </InputLabel>
                  <Select
                    labelId="accentOrder-label"
                    id="accept_order"
                    name="accept_order"
                    value={userInfo.accept_order.value}
                    label="Accent Order"
                    onChange={handelUserInfo}>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <FormLabel id="nonAvailability">Non Availability</FormLabel>
                  <SelectedDates
                    dates={JSON.parse(authInfo.not_available_dates)}
                    handleAvailability={handleAvailability}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="photo"
                  name="photo"
                  onChange={handelUserInfo}
                  label="Upload Picture"
                  variant="outlined"
                  fullWidth
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={handelUserInfo}
                  fullWidth
                  InputProps={{
                    shrink: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={12}>
                <Box display="flex" justifyContent="center">
                  <Button variant="contained" onClick={() => handelSubmit()}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CartContainer>
    </>
  );
}

export default Profile;
