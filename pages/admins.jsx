import Head from "next/head";
import Script from "next/script";
import CreatePost from "../Components/Admin/CreatePost";

export default function Admins() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Script
        src="https://kit.fontawesome.com/e7a0c04ff2.js"
        crossOrigin="anonymous"
      ></Script>
      <CreatePost />
    </section>
  );
}
