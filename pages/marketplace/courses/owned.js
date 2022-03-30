import { Button, Message } from "@components/ui/common";
import { MarketplaceHeader } from "@components/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

const OwnedCourses = () => {
  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>This is a message</Message>
          <Button>Watch the course</Button>
        </OwnedCourseCard>
      </section>
    </>
  );
};

OwnedCourses.Layout = BaseLayout;

export default OwnedCourses;
