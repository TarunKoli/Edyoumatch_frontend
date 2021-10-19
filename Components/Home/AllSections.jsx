import { useContext } from "react";
import styles from "../../styles/Home.module.css";
import { ViewContext } from "../PagesContext";
const AllSections = () => {
  const [view, setView] = useContext(ViewContext);

  return (
    <div>
      <div className={styles.popular}>
        <div className={styles.heading}>
          <h2>Popular</h2>
          <button
            onClick={() => {
              setView("popular");
            }}
          >
            View all
          </button>
        </div>
        <div className={styles.view}>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
        </div>
      </div>
      <div className={styles.popular}>
        <div className={styles.heading}>
          <h2>Suggested</h2>
          <button
            onClick={() => {
              setView("suggested");
            }}
          >
            View all
          </button>
        </div>
        <div className={styles.view}>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
        </div>
      </div>
      <div className={styles.popular}>
        <div className={styles.heading}>
          <h2>Liked</h2>
          <button
            onClick={() => {
              setView("liked");
            }}
          >
            View all
          </button>
        </div>
        <div className={styles.view}>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSections;
