import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import router from "next/router";

const ResetPass = (props) => {
  const [hide, setHide] = useState(true);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

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

  const handleReset = async () => {
    if (!email) {
      return setError("Enter your Email");
    }
    if (!pass) {
      return setError("Enter new password");
    }
    if (!confirm) {
      return setError("Confirm password");
    }
    if (pass !== confirm) {
      return setError("Password does not match");
    }

    try {
      const data = {
        email: email,
        pass: pass,
      };

      const res = await axios({
        url: `http://localhost:8080/auth/resetPass/${props.token}`,
        method: "PATCH",
        data: data,
        withCredentials: true,
      });

      if (res.status === 201) {
        setEmail("");
        setPass("");
        setConfirm("");
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
        }, 2000);
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
          placeholder="New password"
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
      </div>
      <div className={styles.pass}>
        <input
          type={hide ? "password" : "text"}
          name="Confirm Pass"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
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
      </div>
      <button className={styles.submitBtn} onClick={handleReset}>
        Reset password
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
          The Important thing to
          <br />
          remember is not to forget
        </p>
      </div>
    </div>
  );
};
export default ResetPass;
