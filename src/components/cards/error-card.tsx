import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '../ui/card'

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string
  description: string
  retryLink?: string
  retryLinkText?: string
}

export const ErrorCard = ({
  title,
  description,
  retryLink,
  retryLinkText = 'Go back',
  className,
  ...props
}: ErrorCardProps) => {
  return (
    <Card
      as="section"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn('grid place-items-center', className)}
      {...props}
    >
      <CardContent className="flex min-h-[176px] flex-col items-center justify-center space-y-2.5 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-cmalp-4">
          {description}
        </CardDescription>
      </CardContent>
      {retryLink ? (
        <CardFooter>
          <Link
            href={retryLink}
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
            )}
          >
            {retryLinkText}
            <span className="sr-only">{retryLinkText}</span>
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  )
}
