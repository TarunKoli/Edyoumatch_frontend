import Head from "next/head";
import Script from "next/script";
import Chats from "../Components/Chats/Chats";

export default function Chat() {
  return (
    <section id="cover">
      <Head>
        <title>Edyoumatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Script
        src="https://kit.fontawesome.com/e7a0c04ff2.js"
        crossOrigin="anonymous"
      ></Script>
      <Chats />
    </section>
  );
}
