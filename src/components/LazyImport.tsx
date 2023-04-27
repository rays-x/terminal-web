import React from 'react';

interface LazyImportProps {
  component: () => Promise<{ default: React.FC }>;
}

export const LazyImport: React.FC<LazyImportProps & any> = React.memo<LazyImportProps & any>(
  ({component, ...props}: LazyImportProps) => {
    const Component = React.lazy(component);
    return (
      <React.Suspense fallback={null/*<Loader />*/}>
        <Component {...props} />
      </React.Suspense>
    );
  }
);
export default LazyImport;
