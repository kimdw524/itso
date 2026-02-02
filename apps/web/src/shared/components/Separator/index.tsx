import { Fragment, type ReactElement, type ReactNode } from 'react';

interface SeparatorProps {
  children: ReactElement[];
  separator: ReactNode;
}

export const Separator = ({ children, separator }: SeparatorProps) => {
  return (
    <>
      {children.map((child, index) => (
        <Fragment key={child.key || index}>
          {index > 0 && separator}
          {child}
        </Fragment>
      ))}
    </>
  );
};
