export function parseBundle() {
  let totalBalance = 0;
  for (tx of txs) {
    const mul = tx.buy ? 1 : -1
    totalBalance += tx.amount * mul
  }
}
