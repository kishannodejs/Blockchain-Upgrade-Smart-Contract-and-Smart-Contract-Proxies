// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "./ERC20_v1.sol";


contract ERC20_v2 is ERC20_v1 {
    
    function mint(address account, uint256 amount)public {
        _mint(account, amount);
    }

}