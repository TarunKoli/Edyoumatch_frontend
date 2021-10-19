import Head from "next/head";
import Help from "../Components/Help-Page/Help";

export default function HelpPage() {
  return (
    <section>
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>

      <Help />
    </section>
  );
}
