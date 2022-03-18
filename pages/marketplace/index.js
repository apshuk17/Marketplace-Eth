import { BaseLayout } from "@components/ui/layout";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useWeb3 } from "@components/providers";
import { CourseCard } from "@components/ui/course";

const Marketplace = ({ courses }) => {
  const { accountConnected, networkConnected } = useWeb3();
  const { data: accountNumber } = accountConnected;

  const {
    data: networkName,
    target: targetNetwork,
    isSupported,
    hasInitialResponse,
  } = networkConnected;

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={accountNumber}
          network={networkName}
          targetNetwork={targetNetwork}
          isSupported={isSupported}
          hasInitialResponse={hasInitialResponse}
        />
      </div>
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
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
