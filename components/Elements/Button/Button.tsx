import clsx from "clsx";
import * as React from "react";

const variants = {
  primary:
    "text-gray-600 border border-gray-200 hover:text-black hover:border-black",
  secondary: "text-gray-600 hover:bg-gray-200 hover:text-black",
  tertiary: "text-gray-600 hover:text-black",
};

const sizes = {
  sm: "py-1 px-2 text-sm font-light",
  md: "py-1 px-3 text-md font-normal",
  lg: "py-1 px-3 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center duration-200 disabled:cursor-not-allowed rounded-md focus:outline-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <div>loading</div>}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
