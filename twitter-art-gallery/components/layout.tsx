import React from 'react';
import Head from 'next/head';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Twitter Art Gallery</title>
        <meta property="og:title" content="Twitter Art Gallery" key="title" />
      </Head>
      <main>
        <div className="nm-inset-gray-50">
          <Header />
          {children}
        </div>
      </main>
    </>
  )
}
