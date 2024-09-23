import Footer from "../../components/Footer";
import { Header } from "../components";
import { getDateString, getRandomUUID } from "../utils";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow content">
        <h1 className="heading">A server generated page!</h1>

        <section className="data-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Generated</td>
                <td>{getDateString()}</td>
              </tr>
              <tr>
                <td>UUID</td>
                <td>{getRandomUUID()}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}
