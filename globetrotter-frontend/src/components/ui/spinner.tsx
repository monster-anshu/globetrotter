import React, { FC } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { twMerge } from 'tailwind-merge';

export type ISpinnerProps = React.ComponentProps<typeof CgSpinner>;

const Spinner: FC<ISpinnerProps> = ({ className, ...props }) => (
  <CgSpinner
    {...props}
    className={twMerge('mx-auto animate-spin text-lg', className)}
  />
);

export default Spinner;
