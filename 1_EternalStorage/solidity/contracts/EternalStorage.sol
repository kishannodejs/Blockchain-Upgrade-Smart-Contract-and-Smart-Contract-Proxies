// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract EternalStorage {
    address myAddress;
    uint256 myUint;

    function getMyAddress() public view returns (address) {
        return myAddress;
    }

    function setMyAddress(address _myAddress) public {
        myAddress = _myAddress;
    }

    function getMyUint() public view returns (uint256) {
        return myUint;
    }

    function setMyUint(uint256 _myUint) public {
        myUint = _myUint;
    }
}
