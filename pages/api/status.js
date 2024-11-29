import React from "react";
import Layout from "components/style/Layout";

export const getStaticProps = async () => {
  const metaInfo = {
    title: "Order Failed | Keyvendors.com",
    keyword:
      "Keyvendors,certified local home service, waterproofing, interior designer,",
    description:
      "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
  };
  return {
    props: {
      metaInfo,
    },
    revalidate: 60,
  };
}

export default function OrderFailedPage({ transactionId }) {
  return <Layout sx={{ p: 10, bgcolor: "#FBFBFB" }}>Order Failed</Layout>;
}
