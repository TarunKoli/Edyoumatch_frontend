import Head from "next/head";
import { useRouter } from "next/router";
import ResetPass from "../../Components/Authentication/Auth";

export default function ResetPassPage() {
  const router = useRouter();
  return (
    <section id="authCover">
      <Head>
        <title>EdyouMatch</title>
        <meta
          name="description"
          content="EduYouMatch is an online platform to land into ur dream insitution."
        />
      </Head>
      <ResetPass
        mode={"reset"}
        line1={"Reset"}
        line2={"your account"}
        line3={"password"}
        subLine={"The important thing to remember"}
        subLine2={"is not to forget"}
        link={""}
        image={"/Reset.svg"}
        token={router.query.resetToken}
      />
    </section>
  );
}
