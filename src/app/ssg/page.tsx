import { getDateString, getRandomUUID } from "../utils";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center mb-12">SSG</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-sm font-medium text-gray-500 truncate">Generated</p>
              <h2 className="mt-1 text-3xl font-semibold text-gray-900">{getDateString()}</h2>
            </div>
          </article>
          <article className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-sm font-medium text-gray-500 truncate">UUID</p>
              <h2 className="mt-1 text-3xl font-semibold text-gray-900">{getRandomUUID()}</h2>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
