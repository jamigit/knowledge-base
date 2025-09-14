import { cn } from '@/lib/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-skeleton-pulse rounded-lg bg-surface-lighter',
        className
      )}
      {...props}
    />
  )
}