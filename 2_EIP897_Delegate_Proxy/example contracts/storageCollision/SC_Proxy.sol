// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./SC_ProxyStorage.sol";

contract SC_Proxy is SC_ProxyStorage {
    // constructor(address _logicContract) {
    //     setLogicAddress(_logicContract);
    // }

    function setLogicAddress(address _logicContract) public {
        super.setLogicAddressStorage(_logicContract);
    }

    /**
     * @dev Fallback function allowing to perform a delegatecall to the given implementation.
     * This function will return whatever the implementation call returns
     */
    fallback() external payable {
        address _impl = logicContractAddress;

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }

    receive() external payable {}
}
