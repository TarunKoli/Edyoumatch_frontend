import { useContext, useEffect, useState } from "react";
import { PathContext } from "../PagesContext";
import styles from "../../styles/Saved.module.css";
import cookies from "nookies";
import axios from "axios";
import { toast } from "react-toastify";

const SavedInterest = () => {
  const [path, setPath] = useContext(PathContext);
  const [moreDetails, setMoreDetails] = useState(false);
  let [index, setIndex] = useState(0);
  let [postIndex, setPostIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setPath("saved");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getSavedPosts/${
          cookies.get("jwt").jwt
        }`
      );
      const data = await res.json();
      if (res.status === 200) {
        setPosts(data.posts);
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(null);
    }
  }, [error]);

  async function removePost(id) {
    var data = {
      postId: id,
      token: cookies.get("jwt"),
    };
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/removePost`,
      method: "POST",
      data: data,
      withCredentials: true,
    });

    if (res.status === 202) {
      toast.success(res.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

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
                <div
                  className={styles.remove}
                  onClick={() => {
                    removePost(college._id);
                  }}
                >
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
                          alt=""
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
                          <a
                            key={i}
                            href={val.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                                <a
                                  href={val.link}
                                  target="_blank"
                                  key={i}
                                  rel="noopener noreferrer"
                                >
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
