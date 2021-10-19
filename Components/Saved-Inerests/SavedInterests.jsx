import { useContext, useEffect, useState } from "react";
import { PathContext } from "../PagesContext";
import styles from "../../styles/Saved.module.css";
import axios from "axios";
import cookies from "nookies";

const SavedInterest = () => {
  const [path, setPath] = useContext(PathContext);
  const [moreDetails, setMoreDetails] = useState(false);
  let [index, setIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPath("saved");

    const res = await fetch(
      `http://localhost:8080/posts/getSavedPosts/${cookies.get("jwt").jwt}`
    );
    const data = await res.json();
    if (res.status === 200) {
      console.log(data.posts);
      setPosts(data.posts);
    }
  }, []);

  function minusSlide() {
    setIndex((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  }

  function plusSlide(n) {
    setIndex((prev) => {
      if (prev === n - 1) return prev;
      else return prev + 1;
    });
  }

  return (
    <section className={styles.saved}>
      <h1>Saved Interests</h1>
      <div className={styles.postContainer}>
        {posts.map((college, i) => {
          return (
            <div
              key={i}
              className={`${styles.post} posts`}
              onClick={(e) => {
                let position = e.target.getBoundingClientRect();
                let totalWidth = position.left + e.target.clientWidth / 2;
                if (e.clientX > totalWidth) {
                  plusSlide(college.images.length);
                } else if (e.clientX < totalWidth) {
                  minusSlide();
                }
              }}
            >
              <div className={styles.carousel}>
                {college.images.map((val, i) => {
                  return (
                    <div
                      key={i}
                      style={
                        index === i
                          ? { background: "white" }
                          : { background: "rgba(255,255,255,0.5)" }
                      }
                    ></div>
                  );
                })}
              </div>
              <div className={styles.images}>
                {college.images.map((val, i) => {
                  return (
                    <img
                      key={i}
                      src={val}
                      style={
                        index === i ? { display: "block" } : { display: "none" }
                      }
                      draggable="true"
                    />
                  );
                })}
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                      }
                    : {
                        height: "30%",
                        justifyContent: "flex-end",
                      }
                }
              >
                <div className={styles.collegeName}>
                  <h1>{college.collegeName}</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "visible" }
                      : { maxHeight: "100%", overflow: "hidden" }
                  }
                >
                  {college.courses.map((val, i) => {
                    return (
                      <a key={i} href={val.link} target="_blank">
                        {val.name}
                      </a>
                    );
                  })}
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>{college.location}</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>
                        Alumni -{" "}
                        {college.alumnis.map((val, i) => {
                          return val + ", ";
                        })}
                      </p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>
                        Scholarships -{" "}
                        {college.scholarships.map((val, i) => {
                          return (
                            <a href={val.link} target="_blank" key={i}>
                              {val.name + ", "}
                            </a>
                          );
                        })}
                      </p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : {college.winterIntake} <br />
                        Summer Intake : {college.summerIntake}
                      </p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-money-bill-wave"></i>
                      <p>Fees : {college.fees}</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="far fa-file-alt"></i>
                      <p>Description - {college.description}</p>
                    </div>
                    <p
                      className={styles.more}
                      onClick={() => {
                        setMoreDetails((prev) => !prev);
                      }}
                    >
                      Fewer Details
                    </p>
                  </div>
                ) : (
                  <p
                    className={styles.more}
                    onClick={() => {
                      setMoreDetails((prev) => !prev);
                    }}
                  >
                    More Details
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavedInterest;
