import { ethers } from 'ethers'
import ADDRESSES from './consts.js'

export function parseBundle(txs) {
  const totalBalance = computeTotalBalance(txs)

  if (txs.length === 0) {
    return
  }

  //const chains = {}
  //for (const tx of txs) {
    //const mul = tx.buy ? 1 : -1
    //chains[tx.chain] += tx.amount * mul
  //}

  //let minValue = Number.MAX_VALUE;
  //let minKey;
  //let maxValue = Number.MIN_VALUE;
  //let maxKey;
  //for (const [key, value] of Object.entries(chains)) {
    //if (value < minValue) {
      //minKey = key
    //}

    //if (value > maxValue) {
      //maxKey = key
    //}
  //}

  //bridge from max to min and min to max


  const users = txs.map(tx => tx.address)
  const tokens = txs.map(tx => tx.token)
  const amounts = txs.map(tx => tx.amount)

  const buyOrSell = totalBalance > 0
  
  const provider = new ethers.providers.JsonRpcProvider(ADDRESSES.rinkeby.rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const omnicow = new ethers.Contract(ADDRESSES.rinkeby.omnicow, ADDRESSES.rinkeby.abi, signer)

  omnicow.fireBundle(users, tokens, amounts, totalBalance)

  console.log("BUNLDE SENT")
}

function computeTotalBalance(txs) {
  let totalBalance = 0;
  for (const tx of txs) {
    const mul = tx.buy ? 1 : -1
    totalBalance += tx.amount * mul
  }

  return totalBalance;
}

