import { MarketplaceHeader } from "@components/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

const OwnedCourses = () => {
  return (
    <>
      <MarketplaceHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  );
};

OwnedCourses.Layout = BaseLayout;

export default OwnedCourses;
