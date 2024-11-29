import * as React from "react";
import { HeroHeader } from "components/style/HeroHeader";
import Layout from "components/style/Layout";
import Login from "components/user/login";

export const getStaticProps = async () => {
  const metaInfo = {
    title: "Login | Keyvendors.com",
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

export default function LoginPage() {
  return (
    <Layout>
      <HeroHeader title="Sign In/Sign Up" sx={{ backgroundColor: "#9DCDF9" }} />
      <Login />
    </Layout>
  );
}
