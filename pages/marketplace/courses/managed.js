import { useState } from "react";
import { Message } from "@components/ui/common";
import { MarketplaceHeader } from "@components/marketplace";
import {
  CourseFilter,
  ManagedCourseCard,
  VerificationInput,
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { useWeb3 } from "@components/providers";
import {
  enhanceHook,
  useAdmin,
  useManagedCourses,
} from "@components/hooks";

const ManageCourses = () => {
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { account: accountNumber, isAdmin } = useAdmin({redirectTo: '/marketplace'});
  const { contract, web3 } = useWeb3();
  const { data: managedCourses } = enhanceHook(
    useManagedCourses({ web3, contract, account: accountNumber, isAdmin })
  );

  const verifyCourse = ({ email, courseHash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: courseHash }
    );

    proofToCheck === proof
      ? setProofedOwnership(prevState => ({ ...prevState, [courseHash]: true }))
      : setProofedOwnership(prevState => ({ ...prevState, [courseHash]: false }));
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <MarketplaceHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) =>
                verifyCourse({
                  email,
                  courseHash: course.courseHash,
                  proof: course.proof,
                })
              }
            />
            {proofedOwnership[course.courseHash] ? (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            ) : null}
            {proofedOwnership[course.courseHash] === false ? (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            ) : null}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
};

ManageCourses.Layout = BaseLayout;

export default ManageCourses;
