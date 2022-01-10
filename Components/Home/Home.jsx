import styles from "../../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AllSections from "./AllSections";
import ViewAll from "./ViewAll";
import { ViewContext, PathContext } from "../PagesContext";
import Interests from "../Admin/Interest.json";

const Home = () => {
  const router = useRouter();
  const [status, setStatus] = useState("All");
  const [drop, setDrop] = useState(false);
  const [view, setView] = useContext(ViewContext);
  const [path, setPath] = useContext(PathContext);
  const [interest, setInterest] = useState("");
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    setPath("home");
    //eslint-disable-next-line
  }, []);

  const searchInterest = (interest) => {
    const result = Interests.filter((val) => {
      if (
        val.slice(0, interest.length).toLowerCase() === interest.toLowerCase()
      )
        return val;
    });
    setSuggest(result);
  };

  const redirect = () => {
    window.localStorage.setItem("interest", interest);
    router.push(`/posts?interest=${interest}`);
  };

  return (
    <section className={styles.home}>
      <div className={styles.homeBody}>
        <div className={styles.courses}>
          <div className={styles.greet}>
            <div>
              <h1 className={styles.mobileHead}>Edyoumatch</h1>
              <h1 className={styles.owner}>Hello, Tarun Koli</h1>
            </div>
            <div className={styles.search}>
              <input
                type="text"
                name="Interests"
                placeholder="Search your interest...."
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  if (e.target.value) {
                    searchInterest(e.target.value);
                  } else {
                    setSuggest([]);
                  }
                }}
              />
              <button onClick={redirect}>
                <i className="fas fa-search"></i>
              </button>
              <div
                className={styles.suggestions}
                style={
                  suggest.length ? { display: "block" } : { display: "none" }
                }
              >
                {suggest.map((val, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => {
                        setInterest(val);
                        setSuggest([]);
                      }}
                    >
                      {val}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {view === "home" ? <AllSections /> : <div></div>}
          {view === "popular" ? <ViewAll /> : <div></div>}
          {view === "suggested" ? <ViewAll /> : <div></div>}
          {view === "liked" ? <ViewAll /> : <div></div>}
        </div>
        <div className={styles.rightSide}>
          <div className={styles.interests}>
            <h1>Interests</h1>
            <div className={styles.wrapper}>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
              <div className={styles.box1}>
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                <p>Olympics</p>
              </div>
            </div>
            <div className={styles.btn}>
              <button>Add +</button>
            </div>
          </div>
          <div className={styles.scholarships}>
            <h1>Scholarships</h1>
            <div className={styles.filter}>
              <div
                onClick={() => {
                  setDrop((prev) => !prev);
                }}
                className={styles.status}
              >
                <p> {status}</p>
                <div className={drop ? `${styles.rotate}` : `${styles.remove}`}>
                  <i className="fas fa-caret-down"></i>
                </div>
                <div
                  className={
                    drop
                      ? ` ${styles.dropdown} ${styles.visible}`
                      : `${styles.dropdown}`
                  }
                >
                  <p
                    onClick={() => {
                      setStatus("All");
                    }}
                  >
                    All
                  </p>
                  <p
                    onClick={() => {
                      setStatus("Society");
                    }}
                  >
                    Society
                  </p>
                  <p
                    onClick={() => {
                      setStatus("Organisation");
                    }}
                  >
                    Organisation
                  </p>
                  <p
                    onClick={() => {
                      setStatus("College");
                    }}
                  >
                    College
                  </p>
                  <p
                    onClick={() => {
                      setStatus("School");
                    }}
                  >
                    School
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.box2}>
                <div className={styles.icon}>
                  <i className="fas fa-university"></i>
                </div>
                <div className={styles.details}>
                  <h2>Scholarship 1</h2>
                  <p>Organization: Guru Gobind singh Indraprastha university</p>
                </div>
                <div className={styles.prize}>
                  <p>Prize</p>
                  <a>12 lakh</a>
                </div>
              </div>
              <div className={styles.box2}>
                <div className={styles.icon}>
                  <i className="fas fa-university"></i>
                </div>
                <div className={styles.details}>
                  <h2>Scholarship 2</h2>
                  <p>Organization: Guru Gobind singh Indraprastha university</p>
                </div>
                <div className={styles.prize}>
                  <p>Prize</p>
                  <a>1 crore</a>
                </div>
              </div>
              <div className={styles.box2}>
                <div className={styles.icon}>
                  <i className="fas fa-university"></i>
                </div>
                <div className={styles.details}>
                  <h2>Scholarship 3</h2>
                  <p>Organization: Guru Gobind singh Indraprastha university</p>
                </div>
                <div className={styles.prize}>
                  <p>Prize</p>
                  <a>10 lakh</a>
                </div>
              </div>
              <div className={styles.box2}>
                <div className={styles.icon}>
                  <i className="fas fa-university"></i>
                </div>
                <div className={styles.details}>
                  <h2>Scholarship 4</h2>
                  <p>Organization: Guru Gobind singh Indraprastha university</p>
                </div>
                <div className={styles.prize}>
                  <p>Prize</p>
                  <a>5 lakh</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
