// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "./ERC20_v2.sol";


contract ERC20_v3 is ERC20_v2 {
    
    function burn(address account, uint256 amount)public {
        _burn(account, amount);
    }

}