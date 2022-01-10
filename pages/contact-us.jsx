import Head from "next/head";
import Script from "next/script";
import Auth from "../Components/Authentication/Auth";

export default function ContactUsPage() {
  return (
    <section id="authCover">
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
      <Auth
        mode={"contact"}
        line1={"Queries ?"}
        line2={"Feel free to"}
        line3={"contact us"}
        subLine={["Fill out the form and we will be"]}
        subLine2={"in touch within one buisness day"}
        link={""}
        image={"/ContactUs.svg"}
      />
    </section>
  );
}
