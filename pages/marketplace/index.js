
import { useState } from "react";
import { BaseLayout } from "@components/ui/layout";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { CourseCard } from "@components/ui/course";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useWalletInfo } from "@components/hooks";
import { MarketplaceHeader } from "@components/marketplace";

const Marketplace = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchaseCourse } = useWalletInfo();
  console.log('##Marketplace');

  const purchasedCourse = order => {
    alert(JSON.stringify(order));
  }

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                  disabled={!canPurchaseCourse}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {!!selectedCourse ? (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchasedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      ) : null}
    </>
  );
};

export default Marketplace;

export const getStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

Marketplace.Layout = BaseLayout;
