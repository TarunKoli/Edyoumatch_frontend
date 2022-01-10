import { useContext, useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import LoginForm from "./LoginForm";
import RegisterForm from "./SignupForm";
import ForgotForm from "./ForgotPassForm";
import ResetForm from "./ResetPassForm";
import Verification from "./Verification";
import ContactForm from "./ContactUsForm";
import styles from "../../styles/Login.module.css";
import { PathContext } from "../PagesContext";

const Login = (props) => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("auth");
    //eslint-disable-next-line
  }, []);

  return (
    <section className={styles.login}>
      <h1 className={styles.heading}>Edyoumatch</h1>
      <Header mode={props.mode} />
      <div className={styles.wrapper}>
        <div className={styles.info} data-value={props.mode}>
          <h1>
            {props.line1} <br />
            {props.line2} <br />
            {props.line3}
          </h1>
          <p>
            {props.subLine}{" "}
            {props.mode === "login" ? (
              <Link href="/register" passHref>
                <a>{props.link}</a>
              </Link>
            ) : (
              <Link href="/" passHref>
                <a>{props.link}</a>
              </Link>
            )}
            <br />
            {props.subLine2}
          </p>
          <img src={props.image} alt="BicycleImg" data-value={props.mode} />
          <div className={styles.colorBlur}></div>
        </div>
        {props.mode === "login" ? <LoginForm /> : <div></div>}
        {props.mode === "register" ? <RegisterForm /> : <div></div>}
        {props.mode === "forgot" ? (
          <ForgotForm mode={props.mode} />
        ) : (
          <div></div>
        )}
        {props.mode === "reset" ? (
          <ResetForm mode={props.mode} token={props.token} />
        ) : (
          <div></div>
        )}
        {props.mode === "verify" ? (
          <Verification mode={props.mode} token={props.token} />
        ) : (
          <div></div>
        )}
        {props.mode === "contact" ? (
          <ContactForm mode={props.mode} />
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};
export default Login;
