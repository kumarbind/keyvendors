import * as React from "react";
import Layout from "components/style/Layout";
import { HeroHeader } from "components/style/HeroHeader";

export const getStaticProps = async () => {
  const metaInfo = {
    title: "404 | Keyvendors.com",
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

export default function PageNotFound() {
  return (
    <Layout sx={{ pb: 0 }}>
      <HeroHeader title="Page Not Found" />
      Page Not Available !!
    </Layout>
  );
}
