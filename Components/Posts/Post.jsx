import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Posts.module.css";
import { PathContext } from "../PagesContext";
import cookies from "nookies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const router = useRouter();
  const [moreDetails, setMoreDetails] = useState(false);
  let [index, setIndex] = useState(0);
  const [path, setPath] = useContext(PathContext);
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  var [dragMove, setDragMove] = useState(0);
  var touchMove;
  const [page, setPage] = useState(0);
  const [shimmer, setShimmer] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(async () => {
    if (slideIndex === 0) {
      setTimeout(() => {
        setShimmer(true);
      }, 600);
      const res = await fetch(
        `http://localhost:8080/posts/getPosts/${window.localStorage.getItem(
          "interest"
        )}?page=${page}`
      );

      const info = await res.json();

      if (info.data.length === 0) {
        setTimeout(() => {
          setEmpty(true);
        }, 2000);
      }

      setPage(page + 1);
      setSlide(info.data);

      if (data.length) {
        setData([...data, ...info.data]);
        setTimeout(() => {
          setShimmer(false);
        }, 2000);
      } else {
        setData(info.data);
        setTimeout(() => {
          setShimmer(false);
        }, 2000);
      }

      setSlideIndex(info.data.length);
    }
  }, [slideIndex]);

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
  useEffect(() => {
    setPath("posts");
  }, []);

  const savePost = async (id) => {
    try {
      const res = await axios({
        url: "http://localhost:8080/posts/savePost",
        method: "POST",
        data: { data: id, token: cookies.get("jwt") },
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.success(res.data.msg, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  function Start(e, type) {
    if (type === "drag") {
      setDragStart(e.pageX);
      e.dataTransfer.setDragImage(
        e.target,
        window.outerWidth + 800,
        window.outerHeight + 800
      );
    } else {
      setDragStart(e.touches[0].pageX);
    }
  }
  function Move(e, type) {
    let move;
    if (type === "drag") {
      setDragMove(e.pageX);
      move = dragMove;
    } else {
      touchMove = e.touches[0].pageX;
      move = touchMove;
    }

    let save = e.currentTarget.querySelector(".saves");
    let nope = e.currentTarget.querySelector(".nopes");
    if (move > dragStart) {
      e.currentTarget.style.transform =
        "translateX(-" +
        0 +
        "%) translateY(-" +
        40 +
        "%) rotate(" +
        10 +
        "deg)";
      nope.style.visibility = "hidden";
      save.style.visibility = "visible";
      save.style.opacity = 1;
      nope.style.opacity = 0;
    }
    if (move < dragStart) {
      e.currentTarget.style.transform =
        "translateX(-" +
        100 +
        "%) translateY(-" +
        40 +
        "%) rotate(-" +
        10 +
        "deg)";
      nope.style.visibility = "visible";
      nope.style.opacity = 1;
      save.style.visibility = "hidden";
      save.style.opacity = 0;
    }
  }
  function End(e, type, post) {
    let save = e.currentTarget.querySelector(".saves");
    let nope = e.currentTarget.querySelector(".nopes");
    let endDrag;
    if (type === "drag") {
      endDrag = e.pageX;
    } else {
      endDrag = touchMove;
    }
    const { currentTarget } = e;

    if (dragStart < endDrag && endDrag - dragStart > 100 && slideIndex > 0) {
      e.currentTarget.style.transform =
        "translateX(" + 0 + "%) translateY(" + 100 + "%) rotate(" + 45 + "deg)";
      e.currentTarget.style.left = 200 + "%";
      nope.style.visibility = "hidden";
      nope.style.opacity = 0;
      save.style.opacity = 1;
      save.style.visibility = "visible";
      setTimeout(() => {
        currentTarget.remove();
      }, 500);
      setSlideIndex(slideIndex - 1);
      setIndex(0);
      setMoreDetails(0);
      savePost(post);
    }

    if (dragStart > endDrag && dragStart - endDrag > 100 && slideIndex > 0) {
      e.currentTarget.style.transform =
        "translateX(" +
        0 +
        "%) translateY(" +
        100 +
        "%) rotate(-" +
        45 +
        "deg)";
      e.currentTarget.style.left = "-" + 200 + "%";
      nope.style.visibility = "visible";
      nope.style.opacity = 1;
      save.style.visibility = "hidden";
      save.style.opacity = 0;
      setTimeout(() => {
        currentTarget.remove();
      }, 500);
      setSlideIndex(slideIndex - 1);
      setIndex(0);
      setMoreDetails(0);
    }

    if (endDrag - dragStart < 100 || dragStart - endDrag < 100) {
      e.currentTarget.style.transform =
        "translateX(-" +
        50 +
        "%) translateY(-" +
        50 +
        "%) rotate(" +
        0 +
        "deg)";
      nope.style.visibility = "hidden";
      save.style.visibility = "hidden";
      nope.style.opacity = 0;
      save.style.opacity = 0;
      setDragMove(0);
    }
  }

  function notInterested() {
    if (slideIndex > 0) carousel(slideIndex - 1, "L");
  }
  function Interested() {
    if (slideIndex > 0) carousel(slideIndex - 1, "R");
  }

  function carousel(n, direction) {
    let posts = document.querySelectorAll(".posts");
    if (n < posts.length && n >= 0) {
      let save = posts[n].querySelector(".saves");
      let nope = posts[n].querySelector(".nopes");
      if (direction === "R") {
        posts[n].style.transform =
          "translateX(" +
          0 +
          "%) translateY(" +
          10 +
          "%) rotate(" +
          35 +
          "deg)";
        posts[n].style.left = 200 + "%";
        posts[n].style.transitionDelay = 0.5 + "s";
        nope.style.visibility = "hidden";
        nope.style.opacity = 0;
        save.style.opacity = 1;
        save.style.visibility = "visible";
        setIndex(0);
        setMoreDetails(0);
        setTimeout(() => {
          posts[n].remove();
        }, 1000);
        savePost(slide[n]._id);
        setSlideIndex(slideIndex - 1);
      }
      if (direction === "L") {
        posts[n].style.transform =
          "translateX(" +
          0 +
          "%) translateY(" +
          10 +
          "%) rotate(-" +
          35 +
          "deg)";
        posts[n].style.left = "-" + 200 + "%";
        posts[n].style.transitionDelay = 0.5 + "s";
        nope.style.visibility = "visible";
        nope.style.opacity = 1;
        save.style.visibility = "hidden";
        save.style.opacity = 0;
        setIndex(0);
        setMoreDetails(0);
        setTimeout(() => {
          posts[n].remove();
        }, 1000);
        setSlideIndex(slideIndex - 1);
      }
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
    <section className={styles.postPage}>
      <div className={styles.postBody}>
        <div className={styles.swiper}>
          <div className={styles.posts}>
            <div
              className={styles.shimmer}
              style={shimmer ? { display: "flex" } : { display: "none" }}
            >
              <div className={styles.head}></div>
              <div className={styles.boxes}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div
              className={styles.empty}
              style={empty ? { display: "flex" } : { display: "none" }}
            >
              <h1>
                That's all we have <br /> for now.
              </h1>
              <img src="/Thank_you.svg" />
            </div>
            {data.map((college, i) => {
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
                  onDragStart={(e) => {
                    Start(e, "drag");
                  }}
                  onDrag={(e) => {
                    Move(e, "drag");
                  }}
                  onDragEnd={(e) => {
                    End(e, "drag", college._id);
                  }}
                  onTouchStart={(e) => {
                    Start(e, "touch");
                  }}
                  onTouchMove={(e) => {
                    Move(e, "touch");
                  }}
                  onTouchEnd={(e) => {
                    End(e, "touch", college._id);
                  }}
                >
                  <div className={`${styles.save} saves`}>
                    <p>
                      <i className="fas fa-check"></i>
                      <br />
                      Interested
                    </p>
                  </div>
                  <div className={`${styles.nope} nopes`}>
                    <p>
                      <i className="fas fa-times"></i>
                      <br />
                      Not
                      <br />
                      Interested
                    </p>
                  </div>
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
                            index === i
                              ? { display: "block" }
                              : { display: "none" }
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
                        : { height: "32%", justifyContent: "flex-end" }
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
                          : { height: "auto", overflow: "hidden" }
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
          <div className={styles.btns}>
            <button
              id="not"
              onClick={notInterested}
              disabled={shimmer || empty}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              id="interest"
              onClick={Interested}
              disabled={shimmer || empty}
            >
              <i className="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
