import { Suspense } from 'react';

export const withSuspense = <T extends object>(Component: React.ComponentType<T>, fallback: React.ReactNode) => {
  const WrappedComponent = (props: T) => {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  return WrappedComponent;
};
