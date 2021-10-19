import Head from "next/head";
import EduLoans from "../Components/Edu-Loans/EduLoans";

export default function EduLoansPage() {
  return (
    <section id="cover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <EduLoans />
    </section>
  );
}
