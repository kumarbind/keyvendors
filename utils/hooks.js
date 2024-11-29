import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";

export function useLocation() {
  const location = useSelector(getLocation);

  return location
    ? location
    : {
        city_id: 6,
        title: "Delhi",
        slug: "delhi",
      };
}

export function useIsMobile() {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.only("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  return isSM || isMobile;
}

export function useIsLarge() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.only("lg"));
}

export function useUrlHash(initialValue) {
  const router = useRouter();
  const [hash, setHash] = useState(initialValue);

  const updateHash = (str) => {
    if (!str) return;
    setHash(str.split("#")[1]);
  };

  useEffect(() => {
    updateHash(window.location.hash);
    const onWindowHashChange = () => updateHash(window.location.hash);
    const onNextJSHashChange = (url) => updateHash(url);
    router.events.on("hashChangeStart", onNextJSHashChange);
    window.addEventListener("hashchange", onWindowHashChange);
    window.addEventListener("load", onWindowHashChange);
    return () => {
      router.events.off("hashChangeStart", onNextJSHashChange);
      window.removeEventListener("load", onWindowHashChange);
      window.removeEventListener("hashchange", onWindowHashChange);
    };
  }, [router.asPath, router.events]);

  return hash;
}
