import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={`text-black items-center rounded-sm border border-white bg-orange-600 px-2 py-1 text-sm font-medium ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
