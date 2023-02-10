// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract ProxyStorage {
    address public logicContractAddress;

    function setLogicAddressStorage(address _logicContract) internal {
        logicContractAddress = _logicContract;
    }

    function _contractAddress() public view returns (address) {
        return address(this);
    }

}
