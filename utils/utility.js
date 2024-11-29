import toast from "components/style/Toast";
import { useLocation } from "./hooks";
const statusColor = {
  0: "info",
  7: "info",
  4: "success",
  Other: "warning",
};

export const toastMessage = (type="info", message) => {
  toast({ type, message });
};

export const ccyFormat = (num) => {
  return `${(num ? parseInt(num) : 0).toFixed(2)}`;
};

export const getSlotFormatDate = (dates, times) => {
  
  let array = dates.map((date, index) => {
    return {
      ...date,
      date: {
        key: `${date.year}-${date.month}-${date.date}`,
        value: `${date.day},${date.monthName} ${date.date}`,
      },
      slots: times,
    };
  });

  return array;
};


export const getStatusColor = (status) => {
  return statusColor[status] != undefined
    ? statusColor[status]
    : statusColor["Other"];
};

export function a11yPropsTab(type,index) {
  return {
    id: `${type}-tab-${index}`,
    "aria-controls": `${type}-tabpanel-${index}`,
  };
}

export const getServiceUrl = (location,slug) => {
  return `/service/${location.slug}/${slug}`;
};

export const getServiceLink=(service,location)=>{
  let link=service.parent?`${service.parent.slug}/${service.slug}`:`${service.slug}`;
  return getServiceUrl(location,link);
}