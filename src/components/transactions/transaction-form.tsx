'use client'

import {
  addTransaction,
  updateTransaction,
} from '@/actions/server/transactions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { transactionCategory, transactionType } from '@/config/dashboard'
import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  product: z.string().min(1, { message: 'Product is required.' }),
  // date: z.date().transform((date) => date.toString()),
  date: z.date(),
  amount: z.coerce
    .number()
    .nonnegative()
    .transform((number) => Number(number.toFixed(2))),
  type: z.string().min(1),
  category: z.string().min(1),
})

export const TransactionForm = ({
  setOpen,
  formAction,
  transaction,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>
  formAction: 'add' | 'update'
  transaction?: Transaction
}) => {
  const [productsApi, setProductsApi] = useState([''])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: transaction?.product ?? '',
      date: transaction?.date ? new Date(transaction?.date) : new Date(),
      amount: transaction?.amount ?? 0,
      type: transaction?.type ?? transactionType[0],
      category: transaction?.category ?? transactionCategory[0],
    },
  })

  const processForm: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>,
  ) => {
    const { date, ...valuesObj } = values
    const newValues = { date: new Date(date).toString(), ...valuesObj }

    // process form add
    if (formAction === 'add') {
      await addTransaction(newValues)
    }

    // process form update
    if (formAction === 'update' && transaction) {
      await updateTransaction({ ...newValues, id: transaction.id })
    }

    setOpen?.(false)
  }

  const setRandomForm = async () => {
    const randomProduct = productsApi[Math.floor(Math.random() * 30)]
    const dateRandom = new Date(new Date().valueOf() - Math.random() * 1e12)
    const amountRandom = Number((Math.random() * 10000).toFixed(2))
    const typeRandom =
      transactionType[Math.floor(Math.random() * transactionType.length)]
    const categoryRandom =
      transactionCategory[
        Math.floor(Math.random() * transactionCategory.length)
      ]

    form.setValue('product', randomProduct)
    form.setValue('date', dateRandom)
    form.setValue('amount', amountRandom)
    form.setValue('type', typeRandom)
    form.setValue('category', categoryRandom)
  }

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('https://dummyjson.com/products')
      const data = (await res.json()) as { products: [{ title: string }] }
      const products = data.products.map((item) => item.title).sort()
      setProductsApi(products)
    }
    getProducts()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product*</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Uni fan SL120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Transaction Date*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date*</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount*</FormLabel>
              <FormControl>
                <Input type="number" step=".01" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionType.map((type) => {
                    return (
                      <SelectItem
                        className="capitalize"
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionCategory.map((category) => {
                    return (
                      <SelectItem
                        className="capitalize"
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={cn(
            'flex items-center justify-between',
            form.formState.isLoading ? 'pointer-events-none opacity-60' : null,
          )}
        >
          <Button size="sm" type="submit">
            {formAction === 'add' ? 'Submit' : 'Update'}
          </Button>
          <span
            className={cn(
              buttonVariants({ size: 'sm', variant: 'ghost' }),
              form.formState.isLoading && 'pointer-events-none opacity-60',
              'cursor-pointer',
            )}
            onClick={setRandomForm}
          >
            Random
          </span>
        </div>
      </form>
    </Form>
  )
}
