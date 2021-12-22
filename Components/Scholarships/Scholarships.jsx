import { useContext, useEffect } from "react";
import styles from "../../styles/Scholarship.module.css";
import { PathContext } from "../PagesContext";

const Scholarships = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("scholarships");
  }, []);
  return (
    <section className={styles.scholarships}>
      <div className={styles.scholarshipBody}>
        <div className={styles.wrap}>
          <h3>Scholarships</h3>
          <div className={styles.boxWrapper}>
            <div className={styles.box1}>
              <div className={styles.card}>
                <span>01</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>02</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>03</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>04</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>05</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>06</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>07</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>08</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>09</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>10</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>11</span>
                <h1>Harverd University Scholarship</h1>
              </div>
              <div className={styles.card}>
                <span>12</span>
                <h1>Harverd University Scholarship</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
