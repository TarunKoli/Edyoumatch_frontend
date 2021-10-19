import { useState } from "react";
import styles from "../../../styles/Profile/SettingsStyles/Options.module.css";

const LikedPost = () => {
  const [like, setLike] = useState(false);

  return (
    <div
      className={styles.box}
      style={like ? { height: "40rem" } : { height: "9rem" }}
    >
      <div
        className={styles.cover}
        onClick={() => {
          setLike((prev) => !prev);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <i className="fas fa-thumbs-up"></i>
          </div>
          <div>
            <h2>Likes</h2>
            <p>Post Liked by you</p>
          </div>
        </div>
        <div
          className={
            like ? `${styles.chevron} ${styles.active}` : `${styles.chevron}`
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

export default LikedPost;
