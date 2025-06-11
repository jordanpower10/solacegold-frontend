import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from 'next/head'
import "../styles/globals.css"
import CookieConsent from "../components/CookieConsent"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#e0b44a" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />
        <meta name="theme-color" content="#0d0d0d" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <CookieConsent />
      </SessionProvider>
    </>
  )
}
