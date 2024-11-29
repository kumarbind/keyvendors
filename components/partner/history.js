import React, { useEffect, useState } from "react";

import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { FormFiled } from "components/style/fields/FormFiled";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { GMap } from "components/style/GMap";
import { fetchData, postData } from "services/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toastMessage } from "utils/utility";
const BottomItem = ({ title, content }) => (
  <Grid
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
    xs={12}
    sm={12}
    md={4}
    item>
    <Typography
      component="div"
      variant="h5"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      {title}
    </Typography>
    <Typography component="div" variant="body2">
      {content}
    </Typography>
  </Grid>
);
function ContactUs(props) {
  const [captcha, setCaptcha] = useState("");

  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      error: false,
      id: "name",
      label: "Name",
      errorMessage: "You must enter a name",
      type: "text",
      props: {},
    },
    email: {
      value: "",
      error: false,
      id: "email",
      label: "Email",
      errorMessage: "You must enter an email",
      type: "text",
      props: {},
    },
    phone: {
      value: "",
      error: false,
      id: "phone",
      label: "Phone",
      errorMessage: "You must enter Phone",
      type: "text",
      props: {},
    },
    subject: {
      value: "",
      error: false,
      id: "subject",
      label: "Subject",
      errorMessage: "You must enter subject",
      type: "text",
      props: {},
    },
    message: {
      value: "",
      error: false,
      id: "message",
      label: "Message",
      errorMessage: "You must enter message",
      type: "text",
      props: {
        multiline: true,
        rows: 4,
        maxRows: 4,
      },
    },
    captcha: {
      value: "",
      error: false,
      id: "captcha",
      label: "Captcha",
      errorMessage: "You must enter captcha",
      type: "text",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));

    isDisabled();
  };
  const isDisabled = () => {
    let entries = Object.entries(formValues)
      .map((item) => {
        if (item[1].value) {
          return false;
        } else {
          return true;
        }
      })
      .filter((value) => (value ? true : false));
    return entries.length > 0 ? true : false;
  };
  const refreshCaptcha = async () => {
    let res = await fetchData("captcha/math");
    setCaptcha(res);
  };

  const handleSubmit = async () => {
    let data = {"key":captcha.key};
    Object.keys(formValues).forEach(
      (field) => (data[field] = formValues[field].value)
    );

    let res = await postData("contact/submit", data);
    if (res.status) {
      toastMessage("success", res.message);
    } else {
      toastMessage("error", res.message);
    }
  };

  useEffect(() => {
    (async () => {
      let res = await fetchData("contact/info");
      let resCaptcha = await fetchData("captcha/math");
      setCaptcha(resCaptcha);
    })();
  }, []);

  return (
    <>
      <Grid sx={{ pt: 5 }} container>
        <Grid item xs={12} sm={12} md={6}>
          <Grid sx={{ px: 5 }} spacing={4} container>
            <Grid item>
              <Typography variant="h6">How Can We Help Today?</Typography>
              <Typography variant="body1">
                You can fill the following form to address your issues.
              </Typography>
            </Grid>
            {Object.keys(formValues).map((filed, index) => (
              <Grid xs={12} sm={12} md={12} key={index} item>
                <FormFiled
                  fieldValues={formValues[filed]}
                  handleChange={handleChange}
                />
              </Grid>
            ))}
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              xs={12}
              sm={12}
              md={12}
              item>
              <Button onClick={refreshCaptcha}>
                <RefreshIcon />
              </Button>
              <Typography sx={{ ml: 5 }} component="div">
                {captcha && (
                  <Image width="200" height="50" alt="captcha" src={captcha.img} />
                )}
              </Typography>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={isDisabled()}
                endIcon={<SendIcon />}>
                Send To Us
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ pr: 5 }} xs={12} sm={12} md={6} item>
          <GMap />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            justifyContent="center"
            sx={{ display: "flex", mt: 3, p: 5, backgroundColor: "#9CCEF8" }}
            spacing={4}
            container>
            <Grid
              sx={{ display: "flex" }}
              justifyContent="center"
              xs={12}
              sm={12}
              md={12}
              item>
              <Typography variant="h4">Drop Us an Email!</Typography>
            </Grid>

            <BottomItem
              title={
                <>
                  <LocationOnIcon />
                  Our Address
                </>
              }
              content="Nirman Vihar, Shakarpur, Delhi:110092"
            />
            <BottomItem
              title={
                <>
                  <EmailIcon />
                  Email Us
                </>
              }
              content="keyvendors@gmail.com"
            />
            <BottomItem
              title={
                <>
                  <LocalPhoneIcon />
                  Contact Us
                </>
              }
              content="+91 9018181818"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactUs;
