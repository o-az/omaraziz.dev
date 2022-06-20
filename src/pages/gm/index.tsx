import * as Solid from 'solid-js';
const Page = Solid.lazy(() => import('@/components/page'));

export default function Gm() {
  return (
    <Page title="✨">
      <main>
        <h1>gm</h1>
      </main>
    </Page>
  );
}
