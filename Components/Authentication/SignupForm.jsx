import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [hide, setHide] = useState(true);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [gender, setGender] = useState();
  const [check, setCheck] = useState();
  const [terms, setTerms] = useState(false);
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

  const checkAvailability = async (username) => {
    if (username) {
      const doExists = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-availability/${username}`
      );
      const { status } = await doExists.json();
      setCheck(status);
    } else {
      setCheck(false);
    }
  };

  const handleSignup = async () => {
    if (!name) {
      return setError("Please enter your name");
    }
    if (!username) {
      return setError("Please enter a available username");
    }
    if (!email) {
      return setError("Please provide your email");
    }
    if (!pass) {
      return setError("Please enter a password");
    }
    if (!gender) {
      return setError("Select your gender");
    }
    if (!terms) {
      return setError("Please accept our terms and conditions");
    }
    try {
      const data = {
        name: name,
        email: email,
        pass: pass,
        gender: gender,
        username: username,
      };

      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp`,
        method: "POST",
        data: data,
        withCredentials: true,
      });

      if (res.status === 201) {
        setName("");
        setEmail("");
        setPass("");
        setGender("");
        setUsername("");
        setTerms(false);
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className={styles.signUpForm}>
      <input
        type="text"
        name="Name"
        placeholder="Full Name"
        spellCheck="false"
        value={name ? name : ""}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className={styles.pass}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          spellCheck="false"
          value={username ? username : ""}
          onChange={(e) => {
            checkAvailability(e.target.value);
            setUsername(e.target.value);
          }}
          data-value="pass"
        />
        <span>
          {check ? (
            <i className="far fa-check-circle" style={{ color: "green" }}></i>
          ) : (
            <i></i>
          )}
        </span>
      </div>
      <input
        type="email"
        name="Email"
        placeholder="Enter email"
        spellCheck="false"
        value={email ? email : ""}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className={styles.pass}>
        <input
          type={hide ? "password" : "text"}
          name="Pass"
          placeholder="Password"
          spellCheck="false"
          value={pass ? pass : ""}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          data-value="pass"
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
      </div>

      <div className={styles.radios}>
        <div className={styles.rBtns}>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => {
              setGender("male");
            }}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className={styles.rBtns}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => {
              setGender("female");
            }}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div className={styles.rBtns}>
          <input
            type="radio"
            name="gender"
            value="others"
            checked={gender === "others"}
            onChange={(e) => {
              setGender("others");
            }}
          />
          <label htmlFor="others">Others</label>
        </div>
      </div>
      <div className={styles.checkBox}>
        <input
          type="checkbox"
          name="terms-conditions"
          value={"accepted"}
          checked={terms}
          onChange={() => {
            setTerms((prev) => !prev);
          }}
        />
        <label htmlFor="tnc">
          {" "}
          &nbsp;I, accept all{" "}
          <Link
            href="https://firebasestorage.googleapis.com/v0/b/edyoumatch-22576.appspot.com/o/Terms%20of%20Service.pdf?alt=media&token=84c4e82b-67f1-476f-bc1b-874dbe05b7ec"
            passHref
          >
            <a>Terms & Conditions</a>
          </Link>
        </label>
      </div>
      <button className={styles.signUpBtn} onClick={handleSignup}>
        Sign Up
      </button>
      <div className={styles.seprator2}>
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
      <div className={styles.mobileSignUp}>
        <p>
          Already have an account ?
          <br />
          <Link href="/" passHref>
            <a>Login here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
