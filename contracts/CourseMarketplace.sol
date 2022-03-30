// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        // In this order 4 storage slots are required
        uint id; // 32bytes 1 slot in storage
        uint price; // 32bytes 1 slot in storage
        bytes32 proof; // 32bytes 1 slot in storage
        address owner; // 20bytes 1 slot(shared) in storage
        State state; // 1byte 1 slot(shared) in storage
    }

    // mapping of course hash to course details
    mapping(bytes32 => Course) private _ownedCourses;

    // mapping of course id to course hash
    mapping(uint => bytes32) private _ownedCourseHash;

    // number of all courses + id of the course
    uint private _totalOwnedCourses;

    /// Course has already an owner!
    error CourseHasOwner();

    /// Only owner has an access!
    error OnlyOwner();

    // Contract owner
    address payable owner;

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        setContractOwner(msg.sender);
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        if (_hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }
        uint id = _totalOwnedCourses++;
        _ownedCourseHash[id] = courseHash;
        _ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function getCourseCount() external view returns(uint) {
        return _totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint index) external view returns(bytes32) {
        return _ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash) external view returns(Course memory) {
        return _ownedCourses[courseHash];
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getContractOwner() public view returns(address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function _hasCourseOwnership(bytes32 courseHash) private view returns(bool) {
        return _ownedCourses[courseHash].owner == msg.sender;
    }
}