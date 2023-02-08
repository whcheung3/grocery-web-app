import "@/styles/bootstrap.min.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [searchField, setSearchField] = useState(""); // declare high-level "searchField" state

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Grocery Price History Tracker" />
        <meta name="keywords" content="Grocery, Price, History, Tracker" />
        <title>Grocery Price Tracker</title>
        <meta name="application-name" content="Groc$Track" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Groc$Track" />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_14_Pro_Max_landscape.png"
        />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
