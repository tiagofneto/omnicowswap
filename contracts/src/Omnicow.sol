// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import "nxtp/interfaces/IConnextHandler.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";
import "v2-periphery/interfaces/IUniswapV2Router02.sol";

/*
Contracts for:
    Polygon (137)       Sushi
    Gnosis (100)        Sushi
    Cronos (25)         VVS
    Celo (42220)        Sushi
    Neon (245022934)    Raydium
*/

contract Omnicow is Ownable {
    uint256 constant ETH_VALUE = 1500;

    IUniswapV2Router02 public uniswapV2Router;
    IERC20 public USDC;
    IERC20 public WETH;

    // IConnextHandler public immutable connext;

    event SwapCompleted(address user);

    constructor(address _USDC, address _WETH, address _router) {
        USDC = IERC20(_USDC);
        WETH = IERC20(_WETH);
        uniswapV2Router = IUniswapV2Router02(_router);
    }

    function fireBundle(
        address[] calldata user, // to pull from
        address[] calldata token, // if token = USDC, user is buying, if token = WETH, user is selling
        uint256[] calldata amount, // amount of token to pull
        int256 tradingAmount // USD value amount of ETH to buy or sell on DEX
    ) public onlyOwner {
        // 1: Pull user funds
        uint256 totalUSDC;
        uint256 totalWETH;
        for (uint256 i = 0; i < user.length; i++) {
            // If user is selling
            if (token[i] == address(WETH)) {
                // Transfers WETH from user to the contract
                uint256 wethAmount = amount[i] * 10**18 / ETH_VALUE;
                IERC20(token[i]).transferFrom(user[i], address(this), wethAmount);
                totalWETH += wethAmount;
            // If user is buying
            } else {
                // Transfers USDC from user to the contract
                IERC20(token[i]).transferFrom(user[i], address(this), amount[i] * 10**6);
                totalUSDC += amount[i] * 10**6;
            }
        }   

        uint256 amountSwapped = 0;
        // 2: Swap non matched on AMM
        if (tradingAmount > 0) {
            //Sushi buy ETH
            amountSwapped = swapExactTokensForTokens(address(USDC), address(WETH), uint256(tradingAmount) * 10**6);
        } else if (tradingAmount < 0) {
            //Sushi sell ETH
            amountSwapped = swapExactTokensForTokens(address(WETH), address(USDC), uint256(-tradingAmount) * 10**18 / ETH_VALUE);
        }

        // 3: Transfer funds to users
        for (uint256 i = 0; i < user.length; i++) {
            address receiveToken;
            uint256 fundsForUser; 
            if (token[i] == address(WETH)) {
                // if user was selling WETH, they receive USDC
                receiveToken = address(USDC);
                
                uint256 percentOfTokens = (amount[i] * 10**18 / ETH_VALUE / totalWETH) * 100;

                // add or subtract tokens to total pool because of AMM swap
                /*if (tradingAmount == 0) {*/
                  /*fundsForUser = (totalUSDC / 100) * percentOfTokens;*/
                /*}*/
                /*else if (tradingAmount > 0) {*/
                  /*fundsForUser = ((totalUSDC - (uint256(tradingAmount) * 10**6)) / 100) * percentOfTokens;*/
                /*} else {*/
                  /*fundsForUser = ((totalUSDC + amountSwapped) / 100) * percentOfTokens;*/
                /*}*/
                fundsForUser = USDC.balanceOf(address(this)) * percentOfTokens / 100;

            } else {
                // if user was buying WETH, they receive WETH
                receiveToken = address(WETH);

                uint256 percentOfTokens = (amount[i] * 10**6 / totalUSDC) * 100;

                // add or subtract tokens to total pool because of AMM swap
                /*if (tradingAmount == 0) {*/
                  /*fundsForUser = (totalWETH / 100) * percentOfTokens;*/
                /*}*/
                /*else if (tradingAmount > 0) {*/
                  /*fundsForUser = ((totalWETH + amountSwapped) / 100) * percentOfTokens;*/
                /*} else {*/
                  /*fundsForUser = ((totalWETH - (uint256(-tradingAmount) * 10**6)) / 100) * percentOfTokens;*/
                /*}*/
                fundsForUser = WETH.balanceOf(address(this)) * percentOfTokens / 100;
            }
            
            IERC20(receiveToken).transfer(user[i], fundsForUser);
            emit SwapCompleted(user[i]);
        }   
    }

    function swapExactTokensForTokens(
        address tokenSell,
        address tokenBuy,
        uint256 tokenAmount
        ) private returns (uint256) {

        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = tokenSell;
        path[1] = tokenBuy;

        IERC20(tokenSell).approve(address(uniswapV2Router), tokenAmount);

        // make the swap
        return uniswapV2Router.swapExactTokensForTokens(
            tokenAmount,
            0, // accept any amount of tokens
            path,
            address(this),
            block.timestamp
        )[0];
    }

    // function bridge(
    //     address to, // the destination address (e.g. a wallet)
    //     address asset, // address of token on source domain
    //     uint32 originDomain, // e.g. from Rinkeby (1111)
    //     uint32 destinationDomain, // to Goerli (3331)
    //     uint256 amount // amount to transfer
    // ) public {
    //     ERC20 token = ERC20(asset);
    //     require(token.allowance(msg.sender, address(this)) >= amount, "User must approve amount");

    //     token.transferFrom(msg.sender, address(this), amount);
    //     token.approve(address(connext), amount);
    
    //     IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
    //     to: to,
    //     callData: "",
    //     originDomain: originDomain,
    //     destinationDomain: destinationDomain,
    //     agent: to,
    //     recovery: to,
    //     forceSlow: false,
    //     receiveLocal: false,
    //     callback: address(0),
    //     callbackFee: 0,
    //     relayerFee: 0,
    //     slippageTol: 9995
    //     });

    //     IConnextHandler.XCallArgs memory xcallArgs = IConnextHandler.XCallArgs({
    //     params: callParams,
    //     transactingAssetId: asset,
    //     amount: amount
    //     });
    // }

}
