import Head from "next/head";
import Scholarships from "../Components/Scholarships/Scholarships";

export default function ScholarshipPage() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Scholarships />
    </section>
  );
}
