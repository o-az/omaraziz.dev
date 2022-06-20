import * as Solid from 'solid-js';
import { Navigate } from 'solid-app-router';
import { devLogger } from '@/utilities';

type BaseErrorBoundaryProps = Partial<Parameters<typeof Solid.ErrorBoundary>[0]>;

export function BaseErrorBoundary(props: BaseErrorBoundaryProps) {
  const [{ children, fallback }] = Solid.splitProps(props, ['children', 'fallback']);

  return (
    <Solid.ErrorBoundary
      fallback={
        fallback ||
        (error => {
          devLogger('BaseErrorBoundary', JSON.stringify(error, null, 2));
          return <Navigate href="/404" />;
        })
      }
    >
      {children}
    </Solid.ErrorBoundary>
  );
}
