// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./Logic2.sol";

contract Logic3 is Logic2{

    function dec() public virtual override{
        require(myUint > 0, "myUint is zero first increment it.");
        myUint= myUint - 2;
    }

    function inc() public virtual override{
        myUint= myUint + 3;
    }

}
