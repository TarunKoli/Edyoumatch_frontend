import { useState } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";

const UserPost = () => {
  const [self, setSelf] = useState(false);
  return (
    <div
      className={styles.box}
      style={self ? { height: "40rem" } : { height: "9rem" }}
    >
      <div
        className={styles.cover}
        onClick={() => {
          setSelf((prev) => !prev);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <i className="fas fa-object-ungroup"></i>
          </div>
          <div>
            <h2>All Posts</h2>
            <p>Posts created by you....</p>
          </div>
        </div>
        <div
          className={
            self ? `${styles.chevron} ${styles.active}` : `${styles.chevron}`
          }
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className={styles.saved}>
        <div className={styles.savePost}>
          <img src="/Course.svg" alt="postImage" />
          <div className={styles.details}>
            <h3>Guru Gobind Singh Indraprastha university</h3>
            <p>Dwarka sector-14, New Delhi , India</p>
          </div>
        </div>
        <div className={styles.savePost}>
          <img src="/Course.svg" alt="postImage" />
          <div className={styles.details}>
            <h3>Guru Gobind Singh Indraprastha university</h3>
            <p>Dwarka sector-14, New Delhi , India</p>
          </div>
        </div>
        <div className={styles.savePost}>
          <img src="/Course.svg" alt="postImage" />
          <div className={styles.details}>
            <h3>Guru Gobind Singh Indraprastha university</h3>
            <p>Dwarka sector-14, New Delhi , India</p>
          </div>
        </div>
        <div className={styles.savePost}>
          <img src="/Course.svg" alt="postImage" />
          <div className={styles.details}>
            <h3>Guru Gobind Singh Indraprastha university</h3>
            <p>Dwarka sector-14, New Delhi , India</p>
          </div>
        </div>
        <div className={styles.savePost}>
          <img src="/Course.svg" alt="postImage" />
          <div className={styles.details}>
            <h3>Guru Gobind Singh Indraprastha university</h3>
            <p>Dwarka sector-14, New Delhi , India</p>
          </div>
        </div>
      </div>
      <p className={styles.viewAll}>View all</p>
    </div>
  );
};

export default UserPost;
