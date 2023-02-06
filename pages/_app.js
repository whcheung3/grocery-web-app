import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { useState } from "react";

// import RouteGuard from "../components/RouteGuard";

export default function App({ Component, pageProps }) {
  const [searchField, setSearchField] = useState(""); // declare high-level "searchField" state

  return (
    // <RouteGuard>
    <Layout searchField={searchField} setSearchField={setSearchField}>
      <SWRConfig
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);

            // If the status code is not in the range 200-299,
            // we still try to parse and throw it.
            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data."
              );
              // Attach extra info to the error object.
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          },
        }}
      >
        <Component
          {...pageProps}
          searchField={searchField}
          setSearchField={setSearchField}
        />
      </SWRConfig>
    </Layout>
    // </RouteGuard>
  );
}
