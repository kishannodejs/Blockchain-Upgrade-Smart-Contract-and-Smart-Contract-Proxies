// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./Logic1.sol";

contract Logic2 is Logic1{

    function inc() public virtual override{
        myUint= myUint + 2;
    }
    
    function dec() public virtual {
        require(myUint > 0, "myUint is zero first increment it.");
        myUint--;
    }

    function withdraw(uint _amount)public virtual{
        require(balanceOf[msg.sender] >= _amount,"Insufficient Balance");
        balanceOf[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
