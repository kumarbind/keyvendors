import { useRef } from "react";
import Layout from "components/style/Layout";
import ServiceTop from "components/services/ServiceTop";
import ServiceDetail from "components/services/ServiceDetail";
import PageContainer from "components/style/PageContainer";
import { fetchData } from "services/api";
//0-category|area,1->sub category|category ,2->location params

export const getServerSideProps = async (context) => {
  let params = context.params.params;
  let service = null;
  let metaInfo = null;
  let selectedService = null;
  const setting = await fetchData(`global-setting`);
  const serviceRs = await fetchData(
    `location-page/${params.slice(0, 3).join("/")}`
  );

  if (serviceRs.status === 500) {
    return {
      notFound: true, //redirects to 404 page
    };
  }

  let serviceRsData = serviceRs.data;
  service = serviceRsData.page.category;
  service.title=serviceRsData.page.page_title;
  service.header_title=serviceRsData.page.header_title;
  metaInfo = {
    title: serviceRsData.page.seo_title
      ? serviceRsData.page.seo_title
      : serviceRsData.page.page_title,
    keyword: serviceRsData.page.seo_keyword,
    description: serviceRsData.page.seo_description,
    other_meta_tags: serviceRsData.page.other_meta_tags,
    can_tag: serviceRsData.page.can_tag,
    setting: {...setting.data},
  };

  let filterSelectedService = service.children
    ? service.children.filter(
        (ser) => ser.cid === serviceRsData.page.category_id
      )
    : [];

  selectedService = filterSelectedService.length
    ? filterSelectedService[0].slug
    : null;

  return {
    props: {
      service,
      selectedService,
      metaInfo,
    },
  };
};

export default function ServicesPage({ service, selectedService }) {
  const detailRef = useRef(null);
  return (
    <Layout>
      <PageContainer>
        <ServiceTop service={service} scrollToRef={detailRef} />
        <ServiceDetail
          refProp={detailRef}
          service={service}
          selectedService={selectedService}
          showContent={true}
          disableTab={true}
        />
      </PageContainer>
    </Layout>
  );
}
