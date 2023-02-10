// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./EternalStorage.sol";

contract Logic1 {
    address public _EternalStorage;

    function setEternalAdd(address _eternalStorage) public {
        _EternalStorage = _eternalStorage;
    }

    function getAddress() public view returns (address) {
      require(_EternalStorage != address(0),"eternal storage not set");
        return EternalStorage(_EternalStorage).getMyAddress();
    }

    function setAddress(address _address) public {
      require(_EternalStorage != address(0),"eternal storage not set");
        EternalStorage(_EternalStorage).setMyAddress(_address);
    }
}
