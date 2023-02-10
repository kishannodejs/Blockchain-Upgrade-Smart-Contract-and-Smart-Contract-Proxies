// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./ProxyStorage.sol";

contract ERC20Storage is ProxyStorage{

    mapping(address => uint256) internal _balances;

    mapping(address => mapping(address => uint256)) internal _allowances;

    uint256 internal _totalSupply;

    string internal _name;
    string internal _symbol;

}
