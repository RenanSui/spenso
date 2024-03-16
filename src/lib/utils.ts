import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getObjFromEntries = (
  iterableObj: Iterable<readonly [PropertyKey, unknown]>,
) => {
  const obj = JSON.parse(JSON.stringify(Object.fromEntries(iterableObj)))
  return obj
}

export const toSentenceCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

export const removeArrayDuplicates = (array: unknown[]) => {
  return array.filter((value, index) => array.indexOf(value) === index)
}

export const positiveOrNegative = (type: string, amount: number) => {
  const isExpense = type === 'expense'
  const isPositive = amount >= 0

  const negativeAmount = isExpense && isPositive ? amount * -1 : amount
  const positiveAmount = !isExpense && !isPositive ? amount * -1 : amount

  return isExpense ? negativeAmount : positiveAmount
}

export const toPositive = (number: number) => number * -1

export const formatValue = (value: number, format: string) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: format,
  }).format(parseFloat(value.toFixed(2)))
}
