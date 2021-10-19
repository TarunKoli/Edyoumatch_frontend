import { useState } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";
import Link from "next/link";
const ManageAccount = () => {
  const [account, setAccount] = useState(false);
  const [modal, setModal] = useState(false);

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
              <Link href="/help">
                <a>Help center</a>
              </Link>
              <br />
              <br />
              If you still like your account deleted, confirm your password and
              click "Delete My Account".
            </article>
            <br />
            <div className={styles.confirm}>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Confirm your password"
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
            <button>Delete My Account</button>
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
              It's a good idea to use a strong password that you don't use
              elsewhere
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
