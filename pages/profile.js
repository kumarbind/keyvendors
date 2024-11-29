import * as React from "react";
import Layout from "components/style/Layout";
import UserDetails from "components/user/UserDetails";
import { MetaInfo } from "components/style/MetaInfo";

export const getStaticProps = async () => {
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
    },
    revalidate: 60,
  };
}

function ProfilePage() {
  return (
    <Layout sx={{ pb: 0 }}>
      <UserDetails />
    </Layout>
  );
}

export default ProfilePage;
