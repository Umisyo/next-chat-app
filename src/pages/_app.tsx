import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '~/lib/firebase'
import { Noto_Sans_JP } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '~/component/feature/Auth/AuthProvider';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
})


initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={`${notoSansJP.variable} font-sans`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </main >
    </AuthProvider>
  )
}
