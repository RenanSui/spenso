import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const shellVariants = cva('grid items-center gap-8 pb-8 pt-6 md:py-8', {
  variants: {
    variant: {
      default: '',
      centered: 'p-8 flex h-[100dvh] max-w-[1440px] flex-col justify-center',
      sidebar: '',
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
