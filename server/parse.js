import { ethers } from 'ethers'

export function parseBundle(txs) {
  const totalBalance = computeTotalBalance(txs)

  users = txs.map(tx => tx.address)
  tokens = txs.map(tx => tx.token)
  amounts = txs.map(tx => tx.amount)

  const buyOrSell = totalBalance < 0
}

function computeTotalBalance(txs) {
  let totalBalance = 0;
  for (const tx of txs) {
    const mul = tx.buy ? 1 : -1
    totalBalance += tx.amount * mul
  }

  return totalBalance;
}

