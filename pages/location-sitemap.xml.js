import { getServerSideSitemapLegacy } from "next-sitemap";

import { fetchData } from "services/api";

export const getServerSideProps = async (ctx) => {
  const serviceRs = await fetchData(`location-page/all`);
  const fields = serviceRs.data.map((item) => ({
    loc: `${process.env.HOST}/services/${item.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: "0.7",
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Site() {}
