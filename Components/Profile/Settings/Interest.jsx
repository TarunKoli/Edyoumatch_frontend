import { useState } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";

const Interest = () => {
  const [interest, setInterest] = useState(false);

  return (
    <div
      className={styles.box}
      style={interest ? { height: "40rem" } : { height: "9rem" }}
    >
      <div
        className={styles.cover}
        onClick={() => {
          setInterest((prev) => !prev);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <i className="fas fa-heart"></i>
          </div>
          <div>
            <h2>Interests</h2>
            <p>Add your Interests</p>
          </div>
        </div>
        <div
          className={
            interest
              ? `${styles.chevron} ${styles.active}`
              : `${styles.chevron}`
          }
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className={styles.saved}>
        <div className={styles.hobbie}>
          <div className={styles.interest}>
            <p>Astronomy</p>
          </div>
          <div className={styles.interest}>
            <p>Biology</p>
          </div>
          <div className={styles.interest}>
            <p>Football</p>
          </div>
          <div className={styles.interest}>
            <p>Engineering</p>
          </div>
          <div className={styles.interest}>
            <p>Designing</p>
          </div>
          <div className={styles.interest}>
            <p>Acting</p>
          </div>
          <div className={styles.interest}>
            <p>Research</p>
          </div>
          <div className={styles.interest}>
            <p>Developing</p>
          </div>
          <div className={styles.interest}>
            <p>Badminton</p>
          </div>
        </div>
      </div>
      <p className={styles.viewAll}>Add your interests</p>
    </div>
  );
};

export default Interest;
