import Head from "next/head";
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
