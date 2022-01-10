import { useState, useEffect } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookies from "nookies";

const ManageAccount = () => {
  const [account, setAccount] = useState(false);
  const [modal, setModal] = useState(false);
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

  const handleAccount = async () => {
    if (!pass) {
      return setError("Please enter password !!");
    }
    try {
      const data = {
        token: cookies.get("jwt"),
        pass: pass,
      };
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/deleteAccount`,
        method: "DELETE",
        data: data,
        withCredentials: true,
      });
      if (res.status === 200) {
        setPass("");
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
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div
      className={styles.box}
      style={account ? { height: "30rem" } : { height: "9rem" }}
    >
      <div
        className={styles.modal}
        style={
          modal ? { transform: "scale(1,1)" } : { transform: "scale(0,0)" }
        }
      >
        <div className={styles.form}>
          <div className={styles.heading}>
            <h1>Confirm !</h1>
          </div>
          <div className={styles.details}>
            <article>
              Before you go . . . . . ,
              <br />
              <br />
              If you do no think you will use EdYouMatch again and would like
              your account deleted, we can take care of this for you. Keep in
              mind that you will not be able to retrive your account and any of
              the content or information you added.
              <br />
              <br />
              To learn more about account deletion, please visit the{" "}
              <Link href="/help" passHref>
                <a>Help center</a>
              </Link>
              <br />
              <br />
              If you still like your account deleted, confirm your password and
              click &quot;Delete My Account&quot;.
            </article>
            <br />
            <div className={styles.confirm}>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Confirm your password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.submit}>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              Cancel
            </button>
            <button onClick={handleAccount}>Delete My Account</button>
          </div>
        </div>
      </div>
      <div
        className={styles.cover}
        onClick={() => {
          setAccount((prev) => !prev);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h2>Account</h2>
            <p>Delete your account....</p>
          </div>
        </div>
        <div
          className={
            account ? `${styles.chevron} ${styles.active}` : `${styles.chevron}`
          }
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className={styles.choices}>
        <div className={styles.security}>
          <div>
            <i className="fas fa-key"></i>
          </div>
          <div>
            <h3>Change password</h3>
            <p>
              It&apos;s a good idea to use a strong password that you don&apos;t
              use elsewhere
            </p>
          </div>
        </div>
        <div className={styles.security}>
          <div>
            <i className="fas fa-ban"></i>
          </div>
          <div>
            <h3>Blocking</h3>
            <p>See all the peoples you have previously blocked.</p>
          </div>
        </div>
        <div
          className={styles.security}
          onClick={(e) => {
            setModal(true);
          }}
        >
          <div>
            <i className="far fa-trash-alt"></i>
          </div>
          <div>
            <h3>Delete account</h3>
            <p>Delete your account permenantly from Edyoumatch....</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageAccount;
