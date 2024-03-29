import Head from "next/head";
import Script from "next/script";
import Auth from "../Components/Authentication/Auth";

export default function SignIn() {
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
        mode={"login"}
        line1={"Sign In to"}
        line2={"to join communities"}
        line3={"of your interests"}
        subLine={"Don't have an account ?"}
        subLine2={""}
        link={"Register here"}
        image={"/SignIn.svg"}
      />
    </section>
  );
}
