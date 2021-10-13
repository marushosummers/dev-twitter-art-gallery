import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Garoo</title>
          <meta name="description" content="Twitter Image Viewer" />
          <meta itemProp="name" content="Garoo" />
          <meta itemProp="description" content="Twitter Image Viewer" />
          <meta itemProp="image" content="https://garoo.marusho.io/assets/ogp.png" />
          <meta property="og:title" content="Garoo" key="title" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#F3F4F6" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:url" content="https://garoo.marusho.io" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Garoo" />
          <meta property="og:description" content="Twitter Image Viewer" />
          <meta property="og:image" content="https://garoo.marusho.io/assets/ogp.png" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Garoo" />
          <meta name="twitter:description" content="Twitter Image Viewer" />
          <meta name="twitter:image" content="https://garoo.marusho.io/assets/ogp.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
