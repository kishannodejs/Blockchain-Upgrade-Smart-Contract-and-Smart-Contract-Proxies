// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./ProxyStorage.sol";

contract Logic1 is ProxyStorage {
    address public myAddress;
    uint256 public myUint;
    mapping(address => uint256) public balanceOf;

    function setAddress(address _address) public {
        myAddress = _address;
    }

    function inc() public {
        myUint++;
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }
}
