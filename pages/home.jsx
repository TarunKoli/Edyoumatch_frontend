import Head from "next/head";
import Home from "../Components/Home/Home";

export default function HomePage() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Home />
    </section>
  );
}
