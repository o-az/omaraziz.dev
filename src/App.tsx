import * as Solid from 'solid-js';
import { MetaProvider } from 'solid-meta';
import { useRoutes } from 'solid-app-router';
import { ROUTES } from '@/routes';
import { Header } from '@/components';

export default function App() {
  const Route = useRoutes(ROUTES);

  return (
    <Solid.ErrorBoundary fallback={<></>}>
      <MetaProvider>
        <Header />
        <Route />
      </MetaProvider>
    </Solid.ErrorBoundary>
  );
}
