import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white hover:from-navy-700 hover:via-navy-800 hover:to-navy-900 hover:-translate-y-1 shadow-[0_8px_30px_rgb(3,29,61,0.3)] hover:shadow-[0_12px_40px_rgb(3,29,61,0.5)] border border-white/10 shadow-inner",
        secondary: "glass text-white hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]",
        green: "bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:-translate-y-1 shadow-[0_8px_30px_rgb(22,148,71,0.3)] hover:shadow-[0_12px_40px_rgb(22,148,71,0.5)] border border-white/20 shadow-inner",
        solar: "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white hover:from-orange-300 hover:via-orange-400 hover:to-orange-500 hover:-translate-y-1 shadow-[0_8px_30px_rgb(247,148,29,0.3)] hover:shadow-[0_12px_40px_rgb(247,148,29,0.5)] border border-white/20 shadow-inner",
        ghost: "hover:bg-navy-900/5 hover:text-white text-surface-200 transition-colors",
        link: "text-surface-200 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-full px-4",
        lg: "h-14 rounded-full px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
