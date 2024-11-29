import { useState } from "react";
import Router from "next/router";
import CartContainer from "components/cart/CartContainer";
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { login as signin } from "store/authSlice";
import { toastMessage } from "utils/utility";

import { postData } from "services/api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const steps = ["Next", "Verify OTP", "Confirm Detail", "Verify Email"];

function Login(props) {
  const [resendTimer, setResendTimer] = useState(15);
  const [otp, setOtp] = useState(null);
  const [emailOtp, setEmailOtp] = useState(null);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    firstName: {
      value: "",
      error: false,
      errorMessage: "You must enter first name",
      required: true,
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "You must enter last name",
      required: true,
    },
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter email",
      required: false,
    },
    mobile: {
      value: "",
      error: false,
      errorMessage: "You must enter mobile",
      required: true,
    },
    referralCode: {
      value: "",
      error: false,
      errorMessage: "You must enter referralCode",
      required: false,
    },
    updateOnWhatsApp: {
      value: 1,
      error: false,
      errorMessage: "You must enter updateOnWhatsApp",
      required: false,
    },
  });

  const isValidEmail = (value) => {
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
    return regex.test(value.replace(/\s/g, ""));
  };
  const handelStep = (step) => {
    setStep((prev) => (step ? step : prev + 1));
  };

  const handelUserInfo = (e) => {
    let { name, value } = e.target;

    if (name == "updateOnWhatsApp") {
      value = e.target.checked;
    }

    setUserInfo({
      ...userInfo,
      [name]: {
        ...userInfo[name],
        value,
      },
    });
  };
  const sendEmailOtp = async (email) => {
    let status = 0;
    try {
      let res = await postData("email/otp/send", { email: email });
      if (res.status) {
        status = res.status;
        startTimer();
      } else {
        toastMessage("error", res.message);
      }
    } catch (error) {
      toastMessage("error", error);
      console.error(error);
    }
    return status;
  };

  const sendOtp = async (reSend = false) => {
    let mobile = userInfo["mobile"].value;
    if (mobile.length == 10) {
      setUserInfo({
        ...userInfo,
        ["mobile"]: {
          ...userInfo["mobile"],
          error: false,
        },
      });
      try {
        let res = await postData("otp/send", { phone: mobile });
        startTimer();
        if (!reSend) {
          handelStep();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setUserInfo({
        ...userInfo,
        ["mobile"]: {
          ...userInfo["mobile"],
          error: true,
        },
      });
    }
  };

  const validateOtp = async () => {
    if (otp && userInfo["mobile"].value && otp.length == 4) {
      try {
        let res = await postData("otp/validate", {
          phone: userInfo["mobile"].value,
          otp: otp,
          isLogin: true,
        });

        if (res.status === 1) {
          if (res.user !== undefined) {
            dispatch(signin(res.user));
            Router.push("/");
          } else {
            handelStep();
          }
        } else {
          toastMessage("error", res.message);
        }
      } catch (error) {
        toastMessage("error", error);
        console.error(error);
      }
    }
  };
  const saveUser = async () => {
    try {
      let res = await postData("register", {
        phone: userInfo["mobile"].value,
        emailOtp: emailOtp,
        email: userInfo["email"].value,
        name: `${userInfo["firstName"].value} ${userInfo["lastName"].value}`,
        name_title: "",
        isLogin: true,
      });

      if (res.status === 1) {
        if (res.user !== undefined) {
          dispatch(signin(res.user));
          Router.push("/");
        } else {
          handelStep(4);
        }
      } else if (res.status === 0) {
        toastMessage("error", res.message);
      }
    } catch (error) {
      toastMessage("error", error);
      console.error(error);
    }
  };
  const verifyEmailOtp = async () => {
    if (emailOtp && emailOtp.length === 4) {
      await saveUser();
    }
  };

  const verifyForm = async (e) => {
    try {
      e.preventDefault();

      const formFields = Object.keys(userInfo);
      let newFormValues = { ...userInfo };

      for (let index = 0; index < formFields.length; index++) {
        const currentField = formFields[index];
        const currentValue = userInfo[currentField].value;

        if (userInfo[currentField].required) {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField],
              error: currentValue === "",
            },
          };
        }
      }
      if (
        newFormValues["email"].value &&
        !isValidEmail(newFormValues["email"].value)
      ) {
        newFormValues = {
          ...newFormValues,
          ["email"]: {
            ...newFormValues["email"],
            error: true,
          },
        };
      }

      setUserInfo(newFormValues);

      if (
        formFields.filter(
          (value) => newFormValues[value].error && newFormValues[value].required
        ).length < 1
      ) {
        if (newFormValues["email"].value) {
          let isSuccessReq = await sendEmailOtp(newFormValues["email"].value);
          if (isSuccessReq) {
            handelStep();
          }
        } else {
          await saveUser();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startTimer = () => {
    setResendTimer(resendTimer - 1);
    let interval = setInterval(() => {
      return setResendTimer((pr) => {
        if (pr === 0) {
          clearInterval(interval);
          return 15;
        } else {
          return pr - 1;
        }
      });
    }, 1000);
  };

  const handleNext = async (e) => {
    switch (step) {
      case 0:
        await sendOtp();
        break;
      case 1:
        await validateOtp();
        break;
      case 2:
        verifyForm(e);
        break;
      case 3:
        verifyEmailOtp(e);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        component={"section"}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "5rem",
          backgroundColor: (theme) => theme.palette.primary.main,
          justifyContent: "center",
        }}></Box>
      <CartContainer sx={{ minHeight: "35rem" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              flexDirection={"column"}
              sx={{
                pl: 4,
                pt: "1rem",
                display: "flex",
                justifyContent: "start",
              }}>
              <Typography component="div" variant="h4" align="left">
                Sign in
              </Typography>
              <Typography variant="subtitle2" align="left">
                Sign in using your registered Mobile Number
              </Typography>
              <Box
                component="img"
                sx={{
                  height: 250,
                  width: 300,
                  display: { lg: "block", xs: "none" },
                }}
                src="/assets/website_login_page.png"
                alt="Login"
                loading="lazy"
                height={250}
                width={300}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                px: 4,
                py: "1rem",
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}>
              {step < 2 && (
                <>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      label="Mobile Number"
                      variant="standard"
                      name="mobile"
                      size="large"
                      onChange={handelUserInfo}
                      fullWidth
                      required
                      error={userInfo.mobile.error}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Box>
                  {step == 1 && (
                    <>
                      <Box sx={{ display: "flex", pt: 3 }}>
                        <TextField
                          label="OTP"
                          variant="standard"
                          size="small"
                          type="number"
                          name="mobileOtp"
                          onChange={(e) => setOtp(e.target.value)}
                          fullWidth
                          required
                          inputProps={{ maxLength: 4 }}
                          error={otp == null}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 4);
                          }}
                          min={0}
                        />
                      </Box>
                      <Box sx={{ ml: 3 }}>
                        <Typography component="p" variant="body2" color="green">
                          OTP Sent
                        </Typography>
                        <Typography
                          sx={{ fontSize: 10 }}
                          component="p"
                          variant="body2"
                          color="green">
                          {resendTimer == 15 ? (
                            <Link
                              component="button"
                              variant="body2"
                              onClick={() => sendOtp(true)}>
                              Click here to send again OTP
                            </Link>
                          ) : (
                            `Resend In ${resendTimer}`
                          )}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          pt: 1,
                          justifyContent: "center",
                        }}>
                        <Typography component="div" sx={{ fontSize: 14 }}>
                          By proceeding, you agree to the{" "}
                          <Link href="terms-of-service">Terms of Service</Link>
                        </Typography>
                      </Box>
                    </>
                  )}
                </>
              )}
              {step == 2 && (
                <>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      label="First Name"
                      variant="standard"
                      size="small"
                      name="firstName"
                      onChange={handelUserInfo}
                      fullWidth
                      required
                      error={userInfo.firstName.error}
                    />
                  </Box>
                  <Box sx={{ display: "flex", pt: 3 }}>
                    <TextField
                      label="Last Name"
                      variant="standard"
                      size="small"
                      name="lastName"
                      onChange={handelUserInfo}
                      fullWidth
                      required
                      error={userInfo.lastName.error}
                    />
                  </Box>
                  <Box sx={{ display: "flex", pt: 3 }}>
                    <TextField
                      label="Email"
                      variant="standard"
                      size="small"
                      name="email"
                      onChange={handelUserInfo}
                      fullWidth
                      error={userInfo.email.error}
                    />
                  </Box>
                  <Box sx={{ display: "flex", pt: 3 }}>
                    <TextField
                      label="Referral Code(Optional)"
                      variant="standard"
                      size="small"
                      name="referralCode"
                      onChange={handelUserInfo}
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ display: "flex", pt: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            userInfo.updateOnWhatsApp.value ? true : false
                          }
                          name="updateOnWhatsApp"
                          onChange={handelUserInfo}
                          value="updateOnWhatsApp"
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                      }
                      label="I agree to receive updates on WhatsApp"
                    />
                  </Box>
                </>
              )}
              {step == 3 && (
                <>
                  <Box sx={{ display: "flex", pt: 3 }}>
                    <TextField
                      label="Verify Email OTP"
                      variant="standard"
                      size="small"
                      type="number"
                      onChange={(e) => setEmailOtp(e.target.value)}
                      fullWidth
                      required
                      inputProps={{ maxLength: 4 }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 4);
                      }}
                      min={0}
                    />
                  </Box>
                  <Box sx={{ ml: 3 }}>
                    <Typography component="p" variant="body2" color="green">
                      OTP Sent
                    </Typography>
                    <Typography
                      sx={{ fontSize: 10 }}
                      component="p"
                      variant="body2"
                      color="green">
                      {resendTimer == 15 ? (
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => sendEmailOtp(userInfo["email"].value)}>
                          Click here to send again OTP
                        </Link>
                      ) : (
                        `Resend In ${resendTimer}`
                      )}
                    </Typography>
                  </Box>
                </>
              )}

              <Box sx={{ display: "flex", pt: 3 }}>
                <Button
                  sx={{ borderRadius: 29, minWidth: 100 }}
                  size="large"
                  variant="contained"
                  onClick={handleNext}>
                  {steps[step]}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CartContainer>
    </>
  );
}

export default Login;
