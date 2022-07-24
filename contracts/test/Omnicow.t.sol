// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";
import "../src/Omnicow.sol";

contract OmnicowTest is Test {
    Omnicow cow;
    address user1;
    address user2;
    IERC20 USDC;
    IERC20 WETH;
    function setUp() public {
      USDC = IERC20(0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b);
      WETH = IERC20(0xc778417E063141139Fce010982780140Aa0cD5Ab);
      cow = new Omnicow(address(USDC), address(WETH), 
        0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506);

      user1 = address(1);
      vm.deal(user1, 1000 ether);
      user2 = address(2);
      vm.deal(user2, 1000 ether);

    
      vm.startPrank(user1);
      payable(address(WETH)).transfer(400 ether);
  

      USDC.approve(address(cow), 9999999999999999999999);
      WETH.approve(address(cow), 9999999999999999999999);
      vm.stopPrank();

      vm.startPrank(user2);
      payable(address(WETH)).transfer(400 ether);

      USDC.approve(address(cow), 9999999999999999999999);
      WETH.approve(address(cow), 9999999999999999999999);
      vm.stopPrank();
    }

    function testSigleSellETH() public {
      /*address[] user = []*/
    }
}
