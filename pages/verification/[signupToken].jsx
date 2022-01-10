import Head from "next/head";
import { useRouter } from "next/router";
import Verification from "../../Components/Authentication/Auth";
import Fallback404 from "../../Components/FallBack/404";

export default function ResetPassPage({ verified }) {
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
      {verified ? (
        <Verification
          mode={"verify"}
          line1={"Account"}
          line2={"Verified !"}
          line3={""}
          subLine={"Login to continue"}
          subLine2={"with Edyoumatch"}
          link={""}
          image={"/Verify.svg"}
          token={router.query.signupToken}
        />
      ) : (
        <Fallback404 />
      )}
    </section>
  );
}
export async function getServerSideProps(context) {
  const { signupToken } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify/${signupToken}`
  );
  var condition = false;
  if (res.status === 201) {
    condition = true;
  }

  return {
    props: {
      verified: condition,
    }, // will be passed to the page component as props
  };
}
