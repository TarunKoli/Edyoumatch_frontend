import { useEffect, useState, useContext } from "react";
import styles from "../../styles/Posts.module.css";
import { PathContext } from "../PagesContext";

const Posts = () => {
  const [moreDetails, setMoreDetails] = useState(false);
  let [index, setIndex] = useState(0);
  const [path, setPath] = useContext(PathContext);

  useEffect(() => {
    setPath("posts");
    let posts = document.querySelectorAll(".posts");

    posts.forEach((post) => {
      post.addEventListener("click", (e) => {
        let position = post.getBoundingClientRect();
        let totalWidth = position.left + post.clientWidth / 2;
        if (e.clientX > totalWidth) {
          plusSlide();
        } else if (e.clientX < totalWidth) {
          minusSlide();
        }
      });
    });
  }, []);

  useEffect(() => {
    let posts = document.querySelectorAll(".posts");
    let slideIndex = posts.length;
    let movingX, startingX;
    let dragStartX, dragMoveX;

    posts.forEach((post) => {
      post.addEventListener(
        "dragstart",
        (e) => {
          dragStartX = e.pageX;
          e.dataTransfer.setDragImage(
            e.target,
            window.outerWidth + 800,
            window.outerHeight + 800
          );
        },
        false
      );
      post.addEventListener("drag", (e) => {
        let save = post.querySelector(".saves");
        let nope = post.querySelector(".nopes");
        dragMoveX = e.pageX;

        if (dragMoveX > dragStartX) {
          post.style.transform =
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
        if (dragMoveX < dragStartX) {
          post.style.transform =
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
      });
      post.addEventListener("dragend", (e) => {
        let save = post.querySelector(".saves");
        let nope = post.querySelector(".nopes");
        dragMoveX = e.pageX;

        if (
          dragStartX < dragMoveX &&
          dragMoveX - dragStartX > 50 &&
          slideIndex > 1
        ) {
          post.style.transform =
            "translateX(" +
            0 +
            "%) translateY(" +
            100 +
            "%) rotate(" +
            45 +
            "deg)";
          post.style.left = 200 + "%";
          nope.style.visibility = "hidden";
          nope.style.opacity = 0;
          save.style.opacity = 1;
          save.style.visibility = "visible";
          slideIndex -= 1;
          setIndex(0);
          setMoreDetails(0);
        }

        if (
          dragStartX > dragMoveX &&
          dragStartX - dragMoveX > 50 &&
          slideIndex > 1
        ) {
          post.style.transform =
            "translateX(" +
            0 +
            "%) translateY(" +
            100 +
            "%) rotate(-" +
            45 +
            "deg)";
          post.style.left = "-" + 200 + "%";
          nope.style.visibility = "visible";
          nope.style.opacity = 1;
          save.style.visibility = "hidden";
          save.style.opacity = 0;
          slideIndex -= 1;
          setIndex(0);
          setMoreDetails(0);
        }

        if (dragMoveX - dragStartX < 100) {
          post.style.transform =
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
          dragMoveX = undefined;
        }

        if (dragStartX - dragMoveX < 100) {
          post.style.transform =
            "translateX(-" +
            50 +
            "%) translateY(-" +
            50 +
            "%) rotate(-" +
            0 +
            "deg)";
          nope.style.visibility = "hidden";
          save.style.visibility = "hidden";
          nope.style.opacity = 0;
          save.style.opacity = 0;
          dragMoveX = undefined;
        }
      });
    });

    posts.forEach((post) => {
      post.addEventListener("touchstart", (e) => {
        startingX = e.touches[0].pageX;
      });

      post.addEventListener("touchmove", (e) => {
        let save = post.querySelector(".saves");
        let nope = post.querySelector(".nopes");
        movingX = e.touches[0].pageX;

        if (movingX > startingX) {
          post.style.transform =
            "translateX(-" +
            30 +
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
        if (movingX < startingX) {
          post.style.transform =
            "translateX(-" +
            80 +
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
      });

      post.addEventListener("touchend", (e) => {
        let save = post.querySelector(".saves");
        let nope = post.querySelector(".nopes");

        if (startingX < movingX && movingX - startingX > 50 && slideIndex > 1) {
          post.style.transform =
            "translateX(" +
            0 +
            "%) translateY(-" +
            20 +
            "%) rotate(" +
            25 +
            "deg)";
          post.style.left = 200 + "%";
          nope.style.visibility = "hidden";
          nope.style.opacity = 0;
          save.style.opacity = 1;
          save.style.visibility = "visible";
          slideIndex -= 1;
          setIndex(0);
          setMoreDetails(0);
        }

        if (startingX > movingX && startingX - movingX > 50 && slideIndex > 1) {
          post.style.transform =
            "translateX(" +
            0 +
            "%) translateY(-" +
            20 +
            "%) rotate(-" +
            25 +
            "deg)";
          post.style.left = "-" + 200 + "%";
          nope.style.visibility = "visible";
          nope.style.opacity = 1;
          save.style.visibility = "hidden";
          save.style.opacity = 0;
          slideIndex -= 1;
          setIndex(0);
          setMoreDetails(0);
        }

        if (movingX - startingX < 50) {
          post.style.transform =
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
          movingX = undefined;
        }

        if (startingX - movingX < 50) {
          post.style.transform =
            "translateX(-" +
            50 +
            "%) translateY(-" +
            50 +
            "%) rotate(-" +
            0 +
            "deg)";
          nope.style.visibility = "hidden";
          save.style.visibility = "hidden";
          nope.style.opacity = 0;
          save.style.opacity = 0;
          movingX = undefined;
        }
      });
    });

    let Not = document.querySelector("#not");
    let Interest = document.querySelector("#interest");

    Not.addEventListener("click", () => {
      notInterested(-1);
    });
    Interest.addEventListener("click", () => {
      Interested(-1);
    });

    function notInterested(n) {
      if (slideIndex > 1) carousel((slideIndex += n), "L");
    }
    function Interested(n) {
      if (slideIndex > 1) carousel((slideIndex += n), "R");
    }

    function carousel(n, direction) {
      if (n < posts.length && n >= 0) {
        let save = posts[n].querySelector(".saves");
        let nope = posts[n].querySelector(".nopes");
        if (direction === "R") {
          posts[n].style.transform =
            "translateX(" +
            0 +
            "%) translateY(" +
            80 +
            "%) rotate(" +
            35 +
            "deg)";
          posts[n].style.left = 200 + "%";
          posts[n].style.transition = 1 + "s";
          posts[n].style.transitionDelay = 0.5 + "s";
          nope.style.visibility = "hidden";
          nope.style.opacity = 0;
          save.style.opacity = 1;
          save.style.visibility = "visible";
          setIndex(0);
          setMoreDetails(0);
        }
        if (direction === "L") {
          posts[n].style.transform =
            "translateX(" +
            0 +
            "%) translateY(" +
            80 +
            "%) rotate(-" +
            35 +
            "deg)";
          posts[n].style.left = "-" + 200 + "%";
          posts[n].style.transition = 1 + "s";
          posts[n].style.transitionDelay = 0.5 + "s";
          nope.style.visibility = "visible";
          nope.style.opacity = 1;
          save.style.visibility = "hidden";
          save.style.opacity = 0;
          setIndex(0);
          setMoreDetails(0);
        }
      }
    }
  }, []);

  function minusSlide() {
    setIndex((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  }

  function plusSlide() {
    setIndex((prev) => {
      if (prev === 4) return prev;
      else return prev + 1;
    });
  }

  return (
    <section className={styles.postPage}>
      <div className={styles.postBody}>
        <div className={styles.swiper}>
          <div className={styles.posts}>
            <div className={`${styles.post} posts`}>
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
                <div
                  style={
                    index === 0
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 1
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 2
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 3
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 4
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
              </div>
              <div className={styles.images}>
                <img
                  src="/University.jpg"
                  alt="hackerImage"
                  style={
                    index === 0 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download.jpg"
                  alt="hackerImage"
                  style={
                    index === 1 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download (1).jpg"
                  alt="hackerImage"
                  style={
                    index === 2 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images.jpg"
                  alt="hackerImage"
                  style={
                    index === 3 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images2.jpg"
                  alt="hackerImage"
                  style={
                    index === 4 ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                        justifyContent: "flex-start",
                      }
                    : { height: "30%" }
                }
              >
                <div>
                  <h1>Guru Gobind Singh Indraprastha University</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "auto" }
                      : { height: "6rem", overflow: "hidden" }
                  }
                >
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dwarka sector - 16, New Delhi, India</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>Alumni - Tarun Koli, Abhay Raichand</p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>Scholarships - EdChamp, Collegomatic, Scholar Snaps</p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : December-January <br />
                        Summer Intake : May-June
                      </p>
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
            <div className={`${styles.post} posts`}>
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
                <div
                  style={
                    index === 0
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 1
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 2
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 3
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 4
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
              </div>
              <div className={styles.images}>
                <img
                  src="/University.jpg"
                  alt="hackerImage"
                  style={
                    index === 0 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download.jpg"
                  alt="hackerImage"
                  style={
                    index === 1 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download (1).jpg"
                  alt="hackerImage"
                  style={
                    index === 2 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images.jpg"
                  alt="hackerImage"
                  style={
                    index === 3 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images2.jpg"
                  alt="hackerImage"
                  style={
                    index === 4 ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                        justifyContent: "flex-start",
                      }
                    : { height: "30%" }
                }
              >
                <div>
                  <h1>Guru Gobind Singh Indraprastha University</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "auto" }
                      : { height: "6rem", overflow: "hidden" }
                  }
                >
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dwarka sector - 16, New Delhi, India</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>Alumni - Tarun Koli, Abhay Raichand</p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>Scholarships - EdChamp, Collegomatic, Scholar Snaps</p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : December-January <br />
                        Summer Intake : May-June
                      </p>
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
            <div className={`${styles.post} posts`}>
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
                <div
                  style={
                    index === 0
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 1
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 2
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 3
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 4
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
              </div>
              <div className={styles.images}>
                <img
                  src="/University.jpg"
                  alt="hackerImage"
                  style={
                    index === 0 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download.jpg"
                  alt="hackerImage"
                  style={
                    index === 1 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download (1).jpg"
                  alt="hackerImage"
                  style={
                    index === 2 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images.jpg"
                  alt="hackerImage"
                  style={
                    index === 3 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images2.jpg"
                  alt="hackerImage"
                  style={
                    index === 4 ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                        justifyContent: "flex-start",
                      }
                    : { height: "30%" }
                }
              >
                <div>
                  <h1>Guru Gobind Singh Indraprastha University</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "auto" }
                      : { height: "6rem", overflow: "hidden" }
                  }
                >
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dwarka sector - 16, New Delhi, India</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>Alumni - Tarun Koli, Abhay Raichand</p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>Scholarships - EdChamp, Collegomatic, Scholar Snaps</p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : December-January <br />
                        Summer Intake : May-June
                      </p>
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
            <div className={`${styles.post} posts`}>
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
                <div
                  style={
                    index === 0
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 1
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 2
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 3
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 4
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
              </div>
              <div className={styles.images}>
                <img
                  src="/University.jpg"
                  alt="hackerImage"
                  style={
                    index === 0 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download.jpg"
                  alt="hackerImage"
                  style={
                    index === 1 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download (1).jpg"
                  alt="hackerImage"
                  style={
                    index === 2 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images.jpg"
                  alt="hackerImage"
                  style={
                    index === 3 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images2.jpg"
                  alt="hackerImage"
                  style={
                    index === 4 ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                        justifyContent: "flex-start",
                      }
                    : { height: "30%" }
                }
              >
                <div>
                  <h1>Guru Gobind Singh Indraprastha University</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "auto" }
                      : { height: "6rem", overflow: "hidden" }
                  }
                >
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dwarka sector - 16, New Delhi, India</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>Alumni - Tarun Koli, Abhay Raichand</p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>Scholarships - EdChamp, Collegomatic, Scholar Snaps</p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : December-January <br />
                        Summer Intake : May-June
                      </p>
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
            <div className={`${styles.post} posts`}>
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
                <div
                  style={
                    index === 0
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 1
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 2
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 3
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
                <div
                  style={
                    index === 4
                      ? { background: "white" }
                      : { background: "rgba(255,255,255,0.5)" }
                  }
                ></div>
              </div>
              <div className={styles.images}>
                <img
                  src="/University.jpg"
                  alt="hackerImage"
                  style={
                    index === 0 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download.jpg"
                  alt="hackerImage"
                  style={
                    index === 1 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/download (1).jpg"
                  alt="hackerImage"
                  style={
                    index === 2 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images.jpg"
                  alt="hackerImage"
                  style={
                    index === 3 ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src="/images2.jpg"
                  alt="hackerImage"
                  style={
                    index === 4 ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <div
                className={styles.details}
                style={
                  moreDetails
                    ? {
                        height: "100%",
                        justifyContent: "flex-start",
                      }
                    : { height: "30%" }
                }
              >
                <div>
                  <h1>Guru Gobind Singh Indraprastha University</h1>
                </div>
                <div
                  className={styles.courses}
                  style={
                    moreDetails
                      ? { height: "auto", overflow: "auto" }
                      : { height: "6rem", overflow: "hidden" }
                  }
                >
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                  <div>B Tech</div>
                  <div>B Arch</div>
                  <div>B Ed</div>
                  <div>Arts</div>
                  <div>Bio Tech</div>
                  <div>Information Technology</div>
                </div>
                {moreDetails ? (
                  <div>
                    <div className={styles.location}>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dwarka sector - 16, New Delhi, India</p>
                    </div>
                    <div className={styles.alumni}>
                      <i className="fas fa-user-graduate"></i>
                      <p>Alumni - Tarun Koli, Abhay Raichand</p>
                    </div>
                    <div className={styles.scholarships}>
                      <i className="fas fa-award"></i>
                      <p>Scholarships - EdChamp, Collegomatic, Scholar Snaps</p>
                    </div>
                    <div className={styles.intake}>
                      <i className="fas fa-university"></i>
                      <p>
                        Winter Intake : December-January <br />
                        Summer Intake : May-June
                      </p>
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
          <div className={styles.btns}>
            <button id="not">
              <i className="fas fa-times"></i>
            </button>
            <button id="interest">
              <i className="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
