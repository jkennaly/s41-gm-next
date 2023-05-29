import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="bg-white antialiased h-full bg-gray-100" lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=DM+Sans:wght@400;500;700&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
<link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      </Head>
      <body className="h-full">
      <div id="root">
        <Main />
          </div>
        <NextScript />
      </body>
    </Html>
  )
}
