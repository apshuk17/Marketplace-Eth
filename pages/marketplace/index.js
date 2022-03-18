import { BaseLayout } from "@components/ui/layout";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useWeb3 } from "@components/providers";

const Marketplace = ({ courses }) => {
  const { accountConnected } = useWeb3();
  const {
    account: { data: accountNumber },
  } = accountConnected;
  return (
    <>
      <div className="py-4">
        <WalletBar address={accountNumber}/>
      </div>
      <CourseList courses={courses} />
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
