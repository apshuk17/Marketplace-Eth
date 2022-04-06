import useSWR from "swr";
import { normalizeOwnedCourse } from "@utils/normalize";

const useOwnedCourse = ({ web3, contract, course, account }) => {
  //   console.log("##useOwnedCourse", web3, contract, course, account);
  const fetcher = async () => {
    let courseOwned;
    if (course.id) {
      const hexCourseId = web3.utils.utf8ToHex(course.id);
      const courseHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: account }
      );
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      courseOwned = normalizeOwnedCourse(web3)(course, ownedCourse);
    }
    return courseOwned;
  };

  const swrResponse = useSWR(
    web3 && contract && account ? `web3/ownedCourse/${account}` : null,
    fetcher
  );

  return swrResponse;
};

export default useOwnedCourse;
