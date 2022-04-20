import useSWR from "swr";
import { normalizeOwnedCourse } from "@utils/normalize";


const useManagedCourses = ({ web3, contract, account, isAdmin }) => {
  const fetcher = async () => {
    const courses = [];
    const courseCount = await contract.methods.getCourseCount().call();

    for(let i = Number(courseCount) - 1; i >= 0; i--) {
        const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
        const course = await contract.methods.getCourseByHash(courseHash).call();

        if (course) {
            const normalized = normalizeOwnedCourse(web3)({courseHash}, course);
            courses.push(normalized);
        }
    }
    return courses;
  };

  const swrRes = useSWR(
    web3 && contract && account && isAdmin ? `web3/manageCourses/${account}` : null,
    fetcher
  );
  return swrRes;
};

export default useManagedCourses;
