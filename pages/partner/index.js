import * as React from "react";
import Layout from "components/style/Layout";
import PartnerDetails from "components/partner/PartnerDetails";

export const getServerSideProps = async (c) => {
  const metaInfo = {
    title: "Profile | Keyvendors.com",
    keyword:
      "Keyvendors,certified local home service, waterproofing, interior designer,",
    description:
      "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
  };
  return {
    props: {
      metaInfo,
    }
  };
}

function PartnerPage() {
  return (
    <Layout sx={{ pb: 0 }}>
      <PartnerDetails />
    </Layout>
  );
}

export default PartnerPage;
