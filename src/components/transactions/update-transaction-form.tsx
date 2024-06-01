'use client'

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
import { useCurrencies } from '@/hooks/use-currencies'
import { useProducts } from '@/hooks/use-products'
import { cn } from '@/lib/utils'
import { Transaction, TransactionUpdate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { CurrencySelector } from '../currency-selector'

const formSchema = z.object({
  product: z.string().min(1, { message: 'Product is required.' }),
  date: z.date(),
  amount: z.coerce.number().transform((number) => Number(number.toFixed(2))),
  currency: z.string().min(3),
  type: z.string().min(1),
  category: z.string().min(1),
})

export const UpdateTransactionForm = ({
  setOpen,
  transaction,
  updateTransaction,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>
  transaction?: Transaction
  updateTransaction: (formData: TransactionUpdate) => unknown
}) => {
  const { data: productsApi } = useProducts()
  const { data: currencies } = useCurrencies()

  const form = useForm<z.z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: transaction?.product ?? '',
      date: transaction?.date ? new Date(transaction?.date) : new Date(),
      amount: transaction?.amount ?? 0,
      currency: transaction?.currency ?? 'BRL',
      type: transaction?.type ?? transactionType[0],
      category: transaction?.category ?? transactionCategory[0],
    },
  })

  const processForm: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>,
  ) => {
    const { date, ...valuesObj } = values
    const newValues = { date: new Date(date).toString(), ...valuesObj }

    if (transaction) {
      await updateTransaction({ ...transaction, ...newValues })
    }

    setOpen?.(false)
  }

  const setRandomForm = async () => {
    const randomProduct = productsApi[Math.floor(Math.random() * 30)]
    const dateRandom = new Date(new Date().valueOf() - Math.random() * 1e12) // 1e12 is the same as 1000000000000 (a million million).
    const amountRandom = Number((Math.random() * 100000).toFixed(2))
    const typeRandom =
      transactionType[Math.floor(Math.random() * transactionType.length)]
    const categoryRandom =
      transactionCategory[
        Math.floor(Math.random() * transactionCategory.length)
      ]
    const currencyRandom =
      currencies?.[Math.floor(Math.random() * currencies?.length)] ?? ''

    form.setValue('product', randomProduct)
    form.setValue('date', dateRandom)
    form.setValue('amount', amountRandom)
    form.setValue('type', typeRandom)
    form.setValue('category', categoryRandom)
    form.setValue('currency', currencyRandom)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product
                <Required />
              </FormLabel>
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
              <FormLabel>
                Transaction Date
                <Required />
              </FormLabel>
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
                        <span>
                          Pick a date
                          <Required />
                        </span>
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

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Amount
                  <Required />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      className=""
                      type="number"
                      step=".01"
                      placeholder=""
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Currency
                  <Required />
                </FormLabel>
                <FormControl>
                  <div>
                    <Input className="hidden" placeholder="" {...field} />
                    <CurrencySelector
                      value={field.value}
                      onChange={(currency) => {
                        form.setValue('currency', currency)
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Transaction Type
                <Required />
              </FormLabel>
              <Select
                value={form.getValues('type')}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
              <FormLabel>
                Category
                <Required />
              </FormLabel>
              <Select
                value={form.getValues('category')}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
          <Button size="sm" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Required = () => <span className="text-red-500"> *</span>
