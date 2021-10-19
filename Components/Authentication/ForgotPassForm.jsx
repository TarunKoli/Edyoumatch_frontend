import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgotPass = (props) => {
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

  const handleForgot = async () => {
    if (!email) {
      return setError("Please provide your email");
    }
    try {
      const data = {
        email: email,
      };
      const res = await axios({
        url: "http://localhost:8080/auth/forgotPass",
        method: "POST",
        data: data,
        withCredentials: true,
      });
      if (res.status === 200) {
        setEmail("");
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className={styles.form} data-value={props.mode}>
      <img src="/Forgot2.svg" alt="" />
      <input
        type="email"
        name="Email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <button className={styles.submitBtn} onClick={handleForgot}>
        Send Email &nbsp;&nbsp;<i className="fas fa-envelope-open-text"></i>
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
          Forgot Password? No worries
          <br />
          we've got it covered
        </p>
      </div>
    </div>
  );
};
export default ForgotPass;
