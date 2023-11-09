import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getObjFromEntries = (
  iterableObj: Iterable<readonly [PropertyKey, unknown]>,
) => {
  const obj = JSON.parse(JSON.stringify(Object.fromEntries(iterableObj)))
  return obj
}
