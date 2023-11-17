import { Transaction } from '@/types/transactions'

interface TransactionItemProps {
  transaction: Transaction
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div className="rounded bg-neutral-800 p-2" key={transaction.id}>
      <div className="flex justify-between">
        <h1>{transaction.merchant_name}</h1>
        <p>{transaction.amount}</p>
      </div>
      <div className="flex justify-between">
        <p className="capitalize">{transaction.category}</p>
        <p>{transaction.transaction_date.replaceAll('-', '/')}</p>
      </div>
    </div>
  )
}
