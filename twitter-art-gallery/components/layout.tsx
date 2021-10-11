import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Garoo</title>
        <meta property="og:title" content="Garoo" key="title" />
      </Head>
      <main>
        <div className="nm-flat-gray-100">
          {children}
        </div>
      </main>
    </>
  )
}
