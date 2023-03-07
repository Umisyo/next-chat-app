import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '~/lib/firebase'
import { Zen_Kaku_Gothic_Antique } from "@next/font/google";

const Zen_Kaku_Gothic_Antique_light = Zen_Kaku_Gothic_Antique({
  weight: "300"
})
const ZenKakuGothicAntique_normal = Zen_Kaku_Gothic_Antique({
  weight: "400",
});
const ZenKakuGothicAntique_bold = Zen_Kaku_Gothic_Antique({
  weight: "700",
});

initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
         font-family: ${ZenKakuGothicAntique_normal.style.fontFamily},
           ${ZenKakuGothicAntique_bold}, ${Zen_Kaku_Gothic_Antique_light};
       }
     `}</style>
      <Component {...pageProps} />
    </>)
}
