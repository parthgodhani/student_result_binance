// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StudentResult {
    uint256 public studentCount = 0;

    struct Student {
        uint256 id;
        string name;
        string subject1;
        int256 subject1Marks;
        string subject2;
        int256 subject2Marks;
        string subject3;
        int256 subject3Marks;
        string subject4;
        int256 subject4Marks;
        string subject5;
        int256 subject5Marks;
    }

    event StudentCreated(
        uint256 id,
        string name,
        string subject1,
        int256 subject1Marks,
        string subject2,
        int256 subject2Marks,
        string subject3,
        int256 subject3Marks,
        string subject4,
        int256 subject4Marks,
        string subject5,
        int256 subject5Marks
    );

    mapping(uint256 => Student) public students;

    constructor() {
        createStudent(
            "Parth",
            "Mathematiche",
            75,
            "Physics",
            75,
            "Chemistry",
            56,
            "Calculus",
            90,
            "neuroscience",
            38
        );
    }

    function createStudent(
        string memory _name,
        string memory subject1,
        int256 subject1Marks,
        string memory subject2,
        int256 subject2Marks,
        string memory subject3,
        int256 subject3Marks,
        string memory subject4,
        int256 subject4Marks,
        string memory subject5,
        int256 subject5Marks
    ) public {
        studentCount++;

        students[studentCount] = Student(
            studentCount,
            _name,
            subject1,
            subject1Marks,
            subject2,
            subject2Marks,
            subject3,
            subject3Marks,
            subject4,
            subject4Marks,
            subject5,
            subject5Marks
        );

        emit StudentCreated(
            studentCount,
            _name,
            subject1,
            subject1Marks,
            subject2,
            subject2Marks,
            subject3,
            subject3Marks,
            subject4,
            subject4Marks,
            subject5,
            subject5Marks
        );
    }
}
// GQCgtd@6421*