import { useContext, useEffect } from "react";
import styles from "../../styles/Eduloans.module.css";
import { PathContext } from "../PagesContext";

const Scholarships = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("loans");
  }, []);
  return (
    <section className={styles.loans}>
      <div className={styles.loansBody}>
        <div className={styles.wrap}>
          <h3>Loans</h3>
          <div className={styles.boxWrapper}>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardWrap}>
                <span>01</span>
                <h1>Department Loan</h1>
                <button>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
