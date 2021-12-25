import router from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Eduloans.module.css";
import { PathContext } from "../PagesContext";

const Scholarships = () => {
  const [path, setPath] = useContext(PathContext);
  const [loans, setLoans] = useState([]);
  useEffect(async () => {
    setPath("loans");
    const res = await fetch("http://localhost:8080/posts/getLoans");
    const data = await res.json();
    setLoans(data.loans);
  }, []);
  return (
    <section className={styles.loans}>
      <div className={styles.loansBody}>
        <div className={styles.wrap}>
          <h3>Loans</h3>
          <div className={styles.boxWrapper}>
            {loans.map((data, i) => {
              return (
                <div className={styles.card} key={i}>
                  <div className={styles.cardWrap}>
                    <span>{i + 1}</span>
                    <h1
                      style={
                        data.name.length > 30
                          ? data.name.length > 80
                            ? { fontSize: "1.4rem" }
                            : { fontSize: "1.6rem" }
                          : { fontSize: "2rem" }
                      }
                    >
                      {data.name}
                    </h1>
                    <button
                      onClick={() => {
                        router.push(data.link);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
