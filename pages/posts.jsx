import Head from "next/head";
import Posts from "../Components/Posts/Post";

export default function PostsPage() {
  return (
    <section id="cover">
      <Head>
        <title>Edyoumatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Posts />
    </section>
  );
}
