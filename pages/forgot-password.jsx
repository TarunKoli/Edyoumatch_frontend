import Head from "next/head";
import Script from "next/script";
import ForgotPass from "../Components/Authentication/Auth";

export default function ForgotPassPage() {
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
      <ForgotPass
        mode={"forgot"}
        line1={"Forgot"}
        line2={"your account"}
        line3={"password ?"}
        subLine={"No worries,"}
        subLine2={"we've got it covered"}
        link={""}
        image={"/Forgot.svg"}
      />
    </section>
  );
}
