import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '~/lib/firebase'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
})


initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notoSansJP.variable} font-sans`}>
      <Component {...pageProps} />
    </main >
  )
}
