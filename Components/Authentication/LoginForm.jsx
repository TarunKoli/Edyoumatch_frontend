import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "nookies";

const Login = () => {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(null);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email) {
      return setError("Please enter an email !!");
    }
    if (!pass) {
      return setError("Please enter password !!");
    }
    try {
      const data = {
        email: email,
        pass: pass,
      };
      const res = await axios({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        data: data,
        withCredentials: true,
      });
      if (res.status === 200) {
        setEmail("");
        setPass("");
        window.localStorage.setItem("userId", res.data.userId);
        setCookie(null, "jwt", res.data.token, {
          maxAge: 2 * 24 * 60 * 60,
          path: "/",
        });
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className={styles.form}>
      <input
        type="email"
        name="Email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className={styles.pass}>
        <input
          type={hide ? "password" : "text"}
          name="Pass"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        ></input>
        <span
          onClick={() => {
            setHide((prev) => !prev);
          }}
        >
          {hide ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="far fa-eye"></i>
          )}
        </span>
        <Link href="/forgot-password">
          <a>Forgot password ?</a>
        </Link>
      </div>
      <button onClick={handleLogin} className={styles.submitBtn}>
        Sign In
      </button>
      <div className={styles.seprator}>
        <hr size="2" color="black" />
        Or continue with
        <hr size="2" color="black" />
      </div>
      <div className={styles.icons}>
        <div>
          <i className="fab fa-google-plus"></i>
        </div>
        <div>
          <i className="fab fa-apple"></i>
        </div>
        <div>
          <i className="fab fa-facebook"></i>
        </div>
      </div>
      <div className={styles.mobile}>
        <p>
          If you don't have an account
          <br />
          You can{" "}
          <Link href="/register">
            <a>register here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
