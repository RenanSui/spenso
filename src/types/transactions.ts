export interface Transaction {
  id: string
  merchantName: string
  product?: string
  date: string
  amount: string
  transactionType: string
  category: string
  description?: string
  user_id: string
}
