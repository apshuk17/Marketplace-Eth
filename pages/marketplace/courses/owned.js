import { Button, Message } from "@components/ui/common";
import { MarketplaceHeader } from "@components/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { enhanceHook, useOwnedCourses, useWalletInfo } from "@components/hooks";
import { useWeb3 } from "@components/providers";

const OwnedCourses = ({ courses }) => {
  const { accountNumber } = useWalletInfo();
  const { contract, web3 } = useWeb3();
  const { data: ownedCourses } = enhanceHook(
    useOwnedCourses({ courses, account: accountNumber, contract, web3 })
  );

  // console.log('##res', res);

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        {ownedCourses?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Message>This is a message</Message>
            <Button>Watch the course</Button>
          </OwnedCourseCard>
        ))}
      </section>
    </>
  );
};

export default OwnedCourses;

export const getStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

OwnedCourses.Layout = BaseLayout;
