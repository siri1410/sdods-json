import Footer from "../../../components/layout-home/Footer";
import { Header } from "../../components";
import { getDateString, getRandomUUID } from "../../utils";
import { RegenerateButton } from "./RegenerateButton";


export default function Page() {
  return (
    <>
      <Header />
      <main className="content">
        <h1 className="heading">A cached page</h1>

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

        <RegenerateButton />
      </main>
      <Footer />
    </>
  );
}