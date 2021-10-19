import Head from "next/head";
import SavedInterest from "../Components/Saved-Inerests/SavedInterests";

export default function SavedInterestPage() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <SavedInterest />
    </section>
  );
}
