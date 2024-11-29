import * as React from "react";

import Layout from "components/style/Layout";
import { fetchData } from "services/api";
import SiteMap  from "components/style/SiteMap";
import { HeroHeader } from "components/style/HeroHeader";

export const getStaticProps = async () => {

  const services = await fetchData(`services/menu`);
  const pagesRs = await fetchData(`location-page/all`);
  const staticRs = await fetchData(`pages`);

  const metaInfo = {
    title:
      "Get Certified Local Service Expert at your Doorstep | Keyvendors.com",
    keyword:
      "Keyvendors,certified local home service, waterproofing, interior designer,",
    description:
      "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
    setting: []
  };


  return {
    props: {
        metaInfo,
        services,
        locationPages:pagesRs.data,
        staticPages:staticRs.data
    },
    revalidate: 60,
  };
};

export default function SiteMapPage({
    services,
    locationPages,
    staticPages
}) {
  return (
    <Layout megaMenuList={services}>
          <HeroHeader title="Site Map" sx={{ backgroundColor: "#9DCDF9" }} />
      <SiteMap locationPages={locationPages} staticPages={staticPages} />
    </Layout>
  );
}
