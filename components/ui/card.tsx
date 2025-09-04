/*import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "rounded-lg border bg-white text-gray-900 shadow-sm", ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
)
Card.displayName = "Card"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "p-4", ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
)
CardContent.displayName = "CardContent" */