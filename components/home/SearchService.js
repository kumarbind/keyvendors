import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import LocationButton from "components/style/LocationButton";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";

import { fetchData } from "services/api";
import ImageWithFallback from "components/style/ImageWithFallback";
import Link from 'next/link'
import IconContent from "components/style/IconContent";

const TextFieldInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline": {
    borderWidth: "0px",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderWidth: "0px",
  },
}));

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-endAdornment": {
    backgroundColor: "#ffe52c",
    width: "51px",
    height: "51px",
    right: "-6px !important",
    top: "-5px !important",
    borderRadius: "50px",
  },
  "& .MuiAutocomplete-popupIndicator": {
    transform: "none !important",
    backgroundAttachment: "transparent !important",
  },
});

export default function SearchService({ defaultService }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState("Search Service(Enter 3 char)");
  const location = useLocation();

  const handleSearch = async (e) => {
    let keyword = e.target.value;
    if (keyword && keyword.length > 2) {
      setLoading(true);
      let res = await fetchData("services/search", { keyword: keyword });
      setServices(res);
      if(res.length<1){
        setNoOptionsText("No any service found for your location.")
      }     
      setLoading(false);
    }
  };

  const getServiceLink=(service)=>{
    let link=service.parent?`${service.parent.slug}/${service.slug}`:`${service.slug}`;
    return getServiceUrl(location,link);
  }

  useEffect(() => {
    setServices(defaultService);
  }, [defaultService]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          borderTopLeftRadius: "60rem",
          borderBottomLeftRadius: "60rem",
          backgroundColor: "#ffe52c",
          p: 1,
        }}>
        <LocationButton />
      </Box>
      <StyledAutocomplete
        autoComplete={false}
        size="small"
        id="search-services"
        sx={{
          width: "40rem",
          borderBottomRightRadius: "60rem",
          borderTopRightRadius: "60rem",
          background: "white",
        }}
        options={services}
        noOptionsText={noOptionsText}
        loading={loading}
        autoHighlight
        disableClearable
        popupIcon={
          <SearchIcon
            sx={{
              fontSize: "1.8rem",
              color: "black",
              borderRadius: "50rem",
              mt: 1,
              transform: "none !important",
            }}
          />
        }
        onInputChange={(e) => handleSearch(e)}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Box
            component="li"            
            {...props}>
            <Link href={getServiceLink(option)}>
              <IconContent
              clickHandle={true}
                icon={
                  <ImageWithFallback
                    width="20"
                    height="20"
                    src={option.icon}
                    srcSet={`${option.icon} 2x`}
                    alt={option.title}
                  />
                }
                content={option.title}
                isDividerOff={true}
              />
            </Link>
          </Box>
        )}
        renderInput={(params) => (
          <Box sx={{ display: "flex", borderRadius: "60rem" }}>
            <TextFieldInput
              autoComplete="off"
              sx={{ m: 1 }}
              placeholder="Search your Services"
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          </Box>
        )}
        disablePortal={true}
      />
    </Box>
  );
}
