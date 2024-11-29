import React from "react";
import Layout from "components/style/Layout";
import CartDetail from "components/cart/CartDetail";

export const getStaticProps = async () => {
  const metaInfo = {
    title: "Cart Detail | Keyvendors.com",
   // other_meta_tags:'<script  src="https://jssdk.payu.in/bolt/bolt.min.js"></script>',
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

function CartPage() {
  return (
    <Layout sx={{ bgcolor: "#FBFBFB" }}>
      <CartDetail />
    </Layout>
  );
}

export default CartPage;
