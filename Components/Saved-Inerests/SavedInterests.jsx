import { useContext, useEffect, useState } from "react";
import { PathContext } from "../PagesContext";
import styles from "../../styles/Saved.module.css";
import cookies from "nookies";

const SavedInterest = () => {
  const [path, setPath] = useContext(PathContext);
  const [moreDetails, setMoreDetails] = useState(false);
  let [index, setIndex] = useState(0);
  let [postIndex, setPostIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPath("saved");

    const res = await fetch(
      `http://localhost:8080/posts/getSavedPosts/${cookies.get("jwt").jwt}`
    );
    const data = await res.json();
    if (res.status === 200) {
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
      <div className={styles.test}>
        <h3>Saved Interests</h3>
        <div className={styles.postContainer}>
          {posts.map((college, p) => {
            return (
              <div className={styles.postWrapper} key={p}>
                <div className={styles.remove}>
                  <i className="fas fa-times"></i>
                </div>
                <div
                  key={p}
                  className={`${styles.post} posts`}
                  onClick={(e) => {
                    postIndex !== p ? setIndex(0) : setIndex(index);
                    setPostIndex(p);
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
                            index === i && postIndex === p
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
                            index > 0
                              ? index === i && postIndex === p
                                ? { display: "block" }
                                : postIndex === p
                                ? { display: "none" }
                                : { display: "block" }
                              : { display: "block" }
                          }
                          draggable="true"
                        />
                      );
                    })}
                  </div>
                  <div
                    className={styles.details}
                    style={
                      moreDetails && postIndex === p
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
                        moreDetails && postIndex === p
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
                    {moreDetails && postIndex === p ? (
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SavedInterest;
