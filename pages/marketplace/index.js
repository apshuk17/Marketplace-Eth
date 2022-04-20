import { useState } from "react";
import { BaseLayout } from "@components/ui/layout";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { CourseCard } from "@components/ui/course";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useWalletInfo } from "@components/hooks";
import { MarketplaceHeader } from "@components/marketplace";
import { useWeb3 } from "@components/providers";

const Marketplace = ({ courses }) => {
  const { web3, contract, accountConnected: { isAdmin } } = useWeb3();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchaseCourse, accountNumber } = useWalletInfo();

  const purchasedCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    // Same as courseHash in the contract's purchaseCourse method
    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: accountNumber }
    );

    const emailHash = web3.utils.sha3(order.email);

    // emailHash + courseHash
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: courseHash }
    );

    const value = web3.utils.toWei(order.price.toString());

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: accountNumber, value });
    } catch {
      console.error("Purchase Course: Operation has failed");
    }
  };

  return (
    <>
      <MarketplaceHeader isAdmin={isAdmin} />
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
