// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StudentResult {
    uint256 public studentCount = 0;
    
    struct Subject {
        string key;
        uint256 marks;
    }
    struct Student {
        uint256 id;
        string name;
        Subject[] subjects;
    }

    mapping(uint256 => Student) public students;

    function createStudent(string memory _name, Subject[] memory subjects)
        public
    {
        students[studentCount] = Student(studentCount, _name, subjects);
        studentCount++;
    }
}
