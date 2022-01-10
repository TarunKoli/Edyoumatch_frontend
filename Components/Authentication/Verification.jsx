import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

const VerifyAccount = (props) => {
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

  return (
    <div className={styles.form} data-value="verify">
      <div className={styles.mobile}>
        <h1>Account Verified !</h1>
      </div>
      <img src="/checkmark.svg" alt="" width={100} height={100} />
      <button
        className={styles.submitBtn}
        onClick={() => {
          Router.push("/");
        }}
      >
        Continue with Login
      </button>
      <div className={styles.mobile}>
        <p>
          Login to Continue
          <br />
          with Edyoumatch
        </p>
      </div>
    </div>
  );
};
export default VerifyAccount;
