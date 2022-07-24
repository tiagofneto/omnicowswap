// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Omnicow.sol";

contract OmnicowRinkeby is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        Omnicow cow = new Omnicow(0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b, 
          0xc778417E063141139Fce010982780140Aa0cD5Ab, 
          0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506);
        vm.stopBroadcast();
    }
}
