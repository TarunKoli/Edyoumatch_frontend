import Head from "next/head";
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
      <CreatePost />
    </section>
  );
}
