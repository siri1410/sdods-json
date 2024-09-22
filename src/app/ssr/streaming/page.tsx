import { Suspense } from "react";

import { Loading } from "../../components/Loading";
import { Timeout } from "../../components/Timeout";
import { getDateString, getRandomUUID } from "../../utils";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">A server generated page!</h1>
        <h2 className="text-xl">
          <Suspense fallback={<Loading />}>
            <Timeout>Streaming!</Timeout>
          </Suspense>
        </h2>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Generated</p>
          <h2 className="text-2xl font-semibold">{getDateString()}</h2>
        </article>
        <article className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">UUID</p>
          <h2 className="text-2xl font-semibold">{getRandomUUID()}</h2>
        </article>
      </section>
    </main>
  );
}
