export interface Transaction {
  id: string
  created_at: string
  merchant_name: string
  product?: string
  transaction_date: string
  amount: string
  transaction_type: string
  category: string
  description?: string
  user_id: string
}
