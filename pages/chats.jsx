import Head from "next/head";
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
      <Chats />
    </section>
  );
}
