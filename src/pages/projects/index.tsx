import * as Solid from 'solid-js';
const Page = Solid.lazy(() => import('@/components/page'));

export default function Projects() {
  return (
    <Page title="Projects">
      <main>
        <h1>projects</h1>
      </main>
    </Page>
  );
}
