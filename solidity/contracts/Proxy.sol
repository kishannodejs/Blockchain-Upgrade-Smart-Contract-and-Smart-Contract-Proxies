// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import './ProxyStorage.sol';

contract Proxy is ProxyStorage {

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
  fallback() payable external {
    address _impl = logicContractAddress;

    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize())
      let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
      let size := returndatasize()
      returndatacopy(ptr, 0, size)

      switch result
      case 0 { revert(ptr, size) }
      default { return(ptr, size) }
    }
  }
  receive()payable external {}
}