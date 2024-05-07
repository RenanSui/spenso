import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const shellVariants = cva('grid items-center gap-8 pb-8 pt-6 md:py-8', {
  variants: {
    variant: {
      default: 'container',
      sidebar: '',
      centered: 'container flex h-dvh max-w-2xl flex-col justify-center',
      markdown: 'container max-w-3xl py-8 md:py-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ShellProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

const Shell = ({ className, as: Shell = 'section', variant, ...props }: ShellProps) => {
  return <Shell className={cn(shellVariants({ variant }), className)} {...props} />
}

export { Shell, shellVariants }
