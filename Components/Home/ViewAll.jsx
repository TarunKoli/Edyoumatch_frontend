import { useContext, useState } from "react";
import styles from "../../styles/Home.module.css";
import { ViewContext } from "../PagesContext";

const ViewAll = (props) => {
  const [active, setActive] = useContext(ViewContext);

  return (
    <div className={styles.viewAll}>
      <div className={styles.viewNav}>
        <a
          className={active === "popular" ? `${styles.active}` : ""}
          onClick={() => {
            setActive("popular");
          }}
        >
          Popular
        </a>
        <a
          className={active === "suggested" ? `${styles.active}` : ""}
          onClick={() => {
            setActive("suggested");
          }}
        >
          Suggested
        </a>
        <a
          className={active === "liked" ? `${styles.active}` : ""}
          onClick={() => {
            setActive("liked");
          }}
        >
          Liked
        </a>

        <i
          onClick={() => {
            setActive("home");
          }}
          className="fas fa-home"
        ></i>
      </div>
      <div className={styles.popular} data-value="view">
        <div className={styles.heading} data-value="view">
          {active === "popular" ? <h2>{active}</h2> : ""}
          {active === "suggested" ? <h2>{active}</h2> : ""}
          {active === "liked" ? <h2>{active}</h2> : ""}
        </div>
        <div className={styles.view} data-value="view">
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
          <div className={styles.lecture2}>
            <img src="/Course.svg" alt="Course Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
