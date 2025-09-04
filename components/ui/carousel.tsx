import * as React from "react"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: { align?: "start" | "center" | "end" }
}

export const Carousel = ({ className = "w-full", children }: CarouselProps) => (
  <div className={className}>{children}</div>
)

export const CarouselContent = ({ className = "flex gap-2", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className}>{children}</div>
)

export const CarouselItem = ({ className = "basis-full", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className}>{children}</div>
)

export const CarouselNext = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props}>Next</button>
)

export const CarouselPrevious = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props}>Prev</button>
)
