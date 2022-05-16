import "styles/globals.css";

import React from "react";
import type { AppProps } from "next/app";
import Header from "components/Header";
import ReadBlogPost from "components/ReadBlogPost";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Covid Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        breadcrumbOptions={{
          showRoot: false,
          data: [
            {
              name: "redis-examples",
              url: "https://github.com/upstash/redis-examples",
            },
            {
              name: "next-caching-with-redis",
              url: "https://github.com/upstash/redis-examples/tree/master/next-caching-with-redis",
            },
          ],
        }}
      />

      <ReadBlogPost>
        This is a sample project for the blogpost{" "}
        <a
          className="text-primary-600"
          target="_blank"
          rel="noopener noreferrer"
          href="https://blog.upstash.com/nextjs-caching-with-redis"
        >
          Speed up your Next.js application using Serverless Redis for caching.
        </a>
      </ReadBlogPost>

      <div className="mx-auto w-full max-w-3xl py-20 px-6">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
