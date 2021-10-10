import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Twitter Art Gallery</title>
        <meta property="og:title" content="Twitter Art Gallery" key="title" />
      </Head>
      <main>{children}</main>
    </>
  )
}
