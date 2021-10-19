import { useState } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";

const Friends = () => {
  const [friends, setFriends] = useState(false);
  return (
    <div
      className={styles.box}
      style={friends ? { height: "40rem" } : { height: "9rem" }}
    >
      <div
        className={styles.cover}
        onClick={() => {
          setFriends((prev) => !prev);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <i className="fas fa-users"></i>
          </div>
          <div>
            <h2>Friends</h2>
            <p>See friends you have added</p>
          </div>
        </div>
        <div
          className={
            friends ? `${styles.chevron} ${styles.active}` : `${styles.chevron}`
          }
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className={styles.saved}>
        <div className={styles.savePost} data-value="friend">
          <div className={styles.frnd}>
            <i className="far fa-user-circle"></i>
            <div className={styles.details}>
              <h3>Tarun Koli</h3>
              <p>Full stack developer</p>
            </div>
          </div>
          <div className={styles.operation}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className={styles.savePost} data-value="friend">
          <div className={styles.frnd}>
            <i className="far fa-user-circle"></i>
            <div className={styles.details}>
              <h3>Tarun Koli</h3>
              <p>Full stack developer</p>
            </div>
          </div>
          <div className={styles.operation}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className={styles.savePost} data-value="friend">
          <div className={styles.frnd}>
            <i className="far fa-user-circle"></i>
            <div className={styles.details}>
              <h3>Tarun Koli</h3>
              <p>Full stack developer</p>
            </div>
          </div>
          <div className={styles.operation}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className={styles.savePost} data-value="friend">
          <div className={styles.frnd}>
            <i className="far fa-user-circle"></i>
            <div className={styles.details}>
              <h3>Tarun Koli</h3>
              <p>Full stack developer</p>
            </div>
          </div>
          <div className={styles.operation}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className={styles.savePost} data-value="friend">
          <div className={styles.frnd}>
            <i className="far fa-user-circle"></i>
            <div className={styles.details}>
              <h3>Tarun Koli</h3>
              <p>Full stack developer</p>
            </div>
          </div>
          <div className={styles.operation}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
      <p className={styles.viewAll}>View all</p>
    </div>
  );
};

export default Friends;
