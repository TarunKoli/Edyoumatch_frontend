import router from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Scholarship.module.css";
import { PathContext } from "../PagesContext";

const Scholarships = () => {
  const [path, setPath] = useContext(PathContext);
  const [scholarships, setScholarships] = useState([]);
  useEffect(async () => {
    setPath("scholarships");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getScholarships`
    );
    const data = await res.json();
    console.log(data.scholarships);
    setScholarships(data.scholarships);
  }, []);
  return (
    <section className={styles.scholarships}>
      <div className={styles.scholarshipBody}>
        <div className={styles.wrap}>
          <h3>Scholarships</h3>
          <div className={styles.boxWrapper}>
            <div className={styles.box1}>
              {scholarships.map((data, i) => {
                return (
                  <div
                    className={styles.card}
                    onClick={() => {
                      router.push(data.link);
                    }}
                    key={i}
                  >
                    <span>{i + 1}</span>
                    <h1
                      style={
                        data.name.length > 50
                          ? data.name.length > 100
                            ? { fontSize: "1.4rem" }
                            : { fontSize: "1.6rem" }
                          : { fontSize: "2rem" }
                      }
                    >
                      {data.name}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
