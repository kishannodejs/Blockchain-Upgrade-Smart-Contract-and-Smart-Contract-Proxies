// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import './ProxyStorage.sol';

contract Logic1 is ProxyStorage {
    address public myAddress;
    uint public myUint;
    mapping (address => uint) public balanceOf;

    function setAddress(address _address) public virtual{
        myAddress = _address;
    }

    function inc() public virtual{
        myUint++;
    }

    function deposit()public virtual payable{
        balanceOf[msg.sender] += msg.value;
    }

}