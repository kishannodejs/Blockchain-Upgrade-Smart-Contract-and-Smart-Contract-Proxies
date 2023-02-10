// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import './ProxyStorage.sol';

contract Logic1 is ProxyStorage {
    event Logic1SetAdd(address _callBy, address _address);
    event Logic1Increment(address _callBy);
    event Logic1Deposit(address _callBy, uint256 _amount);

    address public myAddress;
    uint public myUint;
    mapping (address => uint) public balanceOf;

    function setAddress(address _address) public {
        myAddress = _address;
        emit Logic1SetAdd(msg.sender, _address);
    }

    function inc() public {
        myUint++;
        emit Logic1Increment(msg.sender);
    }

    function deposit()public payable{
        balanceOf[msg.sender] += msg.value;
        emit Logic1Deposit(msg.sender, msg.value);
    }

}