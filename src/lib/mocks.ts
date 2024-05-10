import { Transaction, TransactionCategories, TransactionGroups } from '@/types'
import { sortRecentTransactions } from './transactions'

const user = {
  address: '',
  name: 'guest',
  email: 'guest@email.com',
  image: null,
  id: '123guest',
}

export const groups: TransactionGroups[] = [
  { created_at: '', id: 'group-1', title: 'Finances', user_id: 'user-1' },
  { created_at: '', id: 'group-2', title: 'Games', user_id: 'user-2' },
  { created_at: '', id: 'group-3', title: 'Traveling', user_id: 'user-3' },
  { created_at: '', id: 'group-4', title: 'Company', user_id: 'user-4' },
]

const categories: TransactionCategories[] = [
  { category: 'finances', sum: -991.55, currency: 'BRL' },
  { category: 'games', sum: -117.69, currency: 'BRL' },
  { category: 'traveling', sum: -512.75, currency: 'BRL' },
  { category: 'utilities', sum: -275.99, currency: 'BRL' },
]

const transactions: Transaction[] = [
  {
    id: 'transaction-4',
    created_at: '2024-05-08T13:50:32.788655+00:00',
    product: 'Samsung Universe 9',
    date: 'Wed May 08 2002 12:03:18 GMT-0300 (Brasilia Standard Time)',
    amount: -46783.85,
    type: 'income',
    category: 'miscellaneous',
    user_id: 'user-4',
    year: '2002',
    currency: 'BRL',
    group_id: 'group-4',
  },
  {
    id: 'transaction-2',
    created_at: '2024-05-08T13:46:35.67936+00:00',
    product: 'Elbow Macaroni - 400 gm',
    date: 'Mon Sep 16 2013 09:44:49 GMT-0300 (Brasilia Standard Time)',
    amount: -65429.35,
    type: 'expense',
    category: 'housing',
    user_id: 'user-3',
    year: '2013',
    currency: 'BRL',
    group_id: 'group-3',
  },
  {
    id: 'transaction-1',
    created_at: '2024-05-08T13:46:40.003354+00:00',
    product: 'Non-Alcoholic Concentrated Perfume Oil',
    date: 'Sat Nov 13 2021 18:31:12 GMT-0300 (Brasilia Standard Time)',
    amount: 78824.44,
    type: 'income',
    category: 'utilities',
    user_id: 'user-1',
    year: '2021',
    currency: 'BRL',
    group_id: 'group-1',
  },
  {
    id: 'transaction-3',
    created_at: '2024-05-08T13:47:47.990675+00:00',
    product: 'Oil Free Moisturizer 100ml',
    date: 'Wed Jul 16 2008 19:20:46 GMT-0300 (Brasilia Standard Time)',
    amount: -56715.5,
    type: 'expense',
    category: 'insurance',
    user_id: 'user-3',
    year: '2008',
    currency: 'BRL',
    group_id: 'group-3',
  },
]

const mockGroups = Promise.resolve(groups)
const mockCategories = Promise.resolve(categories)
const mockTransactions = Promise.resolve(sortRecentTransactions(transactions))
const mockUser = user

export { mockCategories, mockGroups, mockTransactions, mockUser }
