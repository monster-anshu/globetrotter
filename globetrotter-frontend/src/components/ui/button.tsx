import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Spinner from './spinner';

export interface IButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: FC<IButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  variant = 'primary',
  onClick,
  size,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      disabled={loading || disabled}
      className={twMerge(
        'relative rounded-md border border-transparent px-4 py-1.5 font-medium not-disabled:cursor-pointer',
        variant === 'primary' &&
          'border-primary bg-primary text-primary-foreground',
        variant === 'secondary' &&
          'border-secondary bg-secondary text-secondary-foreground',
        size === 'sm' && 'min-w-[100px]',
        size === 'md' && 'min-w-[120px]',
        size === 'lg' && 'min-w-[150px]',
        className
      )}
      onClick={onClick}
      style={{
        background:
          variant === 'primary'
            ? 'linear-gradient(#97e851, #479440)'
            : undefined,
      }}
    >
      {loading ? (
        <span className="relative block h-full w-full">
          <span className="absolute top-1/2 right-0 left-0 -translate-y-1/2">
            <Spinner />
          </span>
          <span className="invisible">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
