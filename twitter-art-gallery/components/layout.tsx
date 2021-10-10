import React from 'react';
import Head from 'next/head';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Garoo</title>
        <meta property="og:title" content="Garoo" key="title" />
      </Head>
      <main>
        <div className="nm-flat-gray-50">
          <Header />
          {children}
        </div>
      </main>
    </>
  )
}
