const ADDRESSES = {
  rinkeby: {
    omnicow: "0x4c63C5dEb208202BC4274b650AdE209C6499233F",
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ETHvalue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"user","type":"address[]"},{"internalType":"address[]","name":"token","type":"address[]"},{"internalType":"uint256[]","name":"amount","type":"uint256[]"},{"internalType":"uint256","name":"tradingAmount","type":"uint256"},{"internalType":"bool","name":"buyingOrSellingETH","type":"bool"}],"name":"fireBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"server","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],
    weth: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    usdc:"0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    rpc: "https://rpc.ankr.com/eth_rinkeby"
  }
}

export default ADDRESSES
