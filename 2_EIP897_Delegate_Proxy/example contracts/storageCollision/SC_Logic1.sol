// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import './SC_ProxyStorage.sol';

contract SC_Logic1 is SC_ProxyStorage {
    address public myAddress;
    uint public myUint;
    mapping (address => uint) public balanceOf;

    function setAddress(address _address) public {
        myAddress = _address;
    }

    function inc() public {
        myUint++;
    }

    function deposit()public payable{
        balanceOf[msg.sender] += msg.value;
    }

}