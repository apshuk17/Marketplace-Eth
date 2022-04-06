import Link from "next/link";
import { Button, Message } from "@components/ui/common";
import { MarketplaceHeader } from "@components/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { enhanceHook, useOwnedCourses, useWalletInfo } from "@components/hooks";
import { useWeb3 } from "@components/providers";
import { useRouter } from "next/router";

const OwnedCourses = ({ courses }) => {
  const { accountNumber, isAccountEmpty } = useWalletInfo();
  const { contract, web3, requireInstall } = useWeb3();
  const { data: ownedCourses, isEmpty: isOwnedCourseEmpty } = enhanceHook(
    useOwnedCourses({ courses, account: accountNumber, contract, web3 })
  );

  const router = useRouter();

  return (
    <>
      <MarketplaceHeader />
      <section className="grid grid-cols-1">
        {isOwnedCourseEmpty ? (
          <div className="w-1/2">
            <Message type="warning">
              <div>You do not own any courses</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        ) : null}
        {isAccountEmpty ? (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask!</div>
            </Message>
          </div>
        ) : null}
        {requireInstall ? (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask!</div>
            </Message>
          </div>
        ) : null}
        {ownedCourses?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Message>This is a message</Message>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
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
