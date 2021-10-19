import Head from "next/head";
import Register from "../Components/Authentication/Auth";

export default function RegisterPage() {
  return (
    <section id="authCover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <Register
        mode={"register"}
        line1={"Create an account"}
        line2={"& make a step"}
        line3={"ahead with us"}
        subLine={"Already have an account ?"}
        subLine2={""}
        link={"Login here"}
        image={"/SignUp.svg"}
      />
    </section>
  );
}
