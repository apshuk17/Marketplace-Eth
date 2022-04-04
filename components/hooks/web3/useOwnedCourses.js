import useSWR from "swr";
import { normalizeOwnedCourse } from "@utils/normalize";

const useOwnedCourses = ({ web3, contract, courses, account }) => {
  const fetcher = async () => {
    const ownedCourses = [];
    const ownedCoursesHashes = courses.reduce((acc, course) => {
      if (course.id) {
        const hexCourseId = web3.utils.utf8ToHex(course.id);
        const courseHash = web3.utils.soliditySha3(
          { type: "bytes16", value: hexCourseId },
          { type: "address", value: account }
        );
        acc.push({ courseHash, course });
      }
      return acc;
    }, []);

    for (let i = 0; i < ownedCoursesHashes.length; i++) {
      const courseHash = ownedCoursesHashes[i].courseHash;
      const course = ownedCoursesHashes[i].course;
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
        ownedCourses.push(normalized);
      }
    }
    return ownedCourses;
  };

  const swrResponse = useSWR(
    web3 && contract && account ? `web3/ownedCourses/${account}` : null,
    fetcher
  );

  return swrResponse;
};

export default useOwnedCourses;
