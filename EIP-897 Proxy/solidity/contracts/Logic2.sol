// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./ProxyStorage.sol";

contract Logic2 is ProxyStorage {
    address public myAddress;
    uint256 public myUint;
    mapping (address => uint) public balanceOf;

    function setAddress(address _address) public {
        myAddress = _address;
    }

    function inc() public {
        myUint++;
    }

    function dec() public {
        require(myUint > 0, "myUint is zero first increment it.");
        myUint--;
    }

    function deposit()public payable{
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw(uint _amount)public {
        require(balanceOf[msg.sender] >= _amount,"Insufficient Balance");
        balanceOf[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
