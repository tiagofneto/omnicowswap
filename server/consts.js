const ADDRESSES = {
  rinkeby: {
    omnicow: "0xE20Dc74FF87C6C466A3Fe40580E54AbF12360fee",
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"user","type":"address[]"},{"internalType":"address[]","name":"token","type":"address[]"},{"internalType":"uint256[]","name":"amount","type":"uint256[]"},{"internalType":"int256","name":"tradingAmount","type":"int256"}],"name":"fireBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
    weth: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    usdc:"0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    rpc: "https://rpc.ankr.com/eth_rinkeby"
  }
}

export default ADDRESSES
