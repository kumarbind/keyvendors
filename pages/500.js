import * as React from "react";
import Layout from "components/style/Layout";
import { HeroHeader } from "components/style/HeroHeader";

export const getStaticProps = async () => {
  const metaInfo = {
    title: "500 | Keyvendors.com",
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

export default function ErrorPage() {
  return (
    <Layout sx={{ pb: 0 }}>
      <HeroHeader title="500" />
      Sorry For your inconvenience ,we will back soon.
    </Layout>
  );
}
