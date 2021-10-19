import Head from "next/head";
import Profile from "../Components/Profile/Profile";

export default function ProfilePage() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Profile />
    </section>
  );
}
