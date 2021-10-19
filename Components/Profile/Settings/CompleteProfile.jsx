import styles from "../../../styles/Profile/SettingsStyles/Complete.module.css";
const CompleteProfile = () => {
  return (
    <div className={styles.complete}>
      <div className={styles.upBox}>
        <div className={styles.percentage}>75%</div>
        <div className={styles.info}>
          <h2>Profile information</h2>
          <p>
            Complete your profile to
            <br /> unlock all the features
          </p>
        </div>
      </div>
      <div className={styles.downBox}>
        <button>Complete my profile</button>
      </div>
    </div>
  );
};
export default CompleteProfile;
