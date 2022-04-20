const CourseMarketplace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  let _contract;
  let contractOwner;
  let buyer;
  /** 
     * course Id: 14, email: apshuk21@gmail.com
     * const hexId = web3.utils.utf8ToHex("14");
     * const courseHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexId },
            { type: "address", value: "0xaAD72e3F64e1E98EA88109DB0Fe4BE3d5f66d951" }
        );
        const email = web3.utils.sha3('apshuk21@gmail.com');
        const proof = web3.utils.soliditySha3({
            type: "bytes32", value: courseHash,
            type: "bytes32", value: email
        })
        courseHash 0x3ee367b7ced0ddbfb0420168b148c8f320969a50869998751b9b02edd9fe919b (with buyer's address)
    */
  const courseId = "0x31340000000000000000000000000000";
  const proof =
    "0x06ed2d1d3e7acc3490ccaa022b638f963e46f9fae9eb9fab867e6f1d6834a791";
  const value = "900000000";

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];
  });

  describe("Purchase the new Course", () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it("can get the purchased course hash by index", async () => {
        // assert(true, "Passed");
      const index = 0;
      const courseHash = await _contract.getCourseHashAtIndex(index);
      const expectedCourseHash = web3.utils.soliditySha3(
        { type: "bytes16", value: courseId },
        { type: "address", value: buyer }
      );

      assert.equal(courseHash, expectedCourseHash, "Course Hashes should be identical");
    });
  });
});
