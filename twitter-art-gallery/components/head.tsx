import React from 'react';
import Head from 'next/head';

const head: React.FC<void> = (): JSX.Element => {
  return (
    <Head>
      <title>Twitter Art Gallery</title>
      <meta property="og:title" content="Twitter Art Gallery" key="title" />
    </Head>
  );
};

export default head;
