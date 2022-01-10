import Link from "next/link";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/NavBar.module.css";
import { NavContext, PathContext } from "./PagesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import cookies, { destroyCookie } from "nookies";

const NavBar = (props) => {
  const [nav, setNav] = useContext(NavContext);
  const [path, setPath] = useContext(PathContext);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loc, setLoc] = useState("/");

  useEffect(() => {
    setLoc(router.pathname);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = {
          token: cookies.get("jwt"),
        };
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/is-user`,
          method: "POST",
          data: data,
          withCredentials: true,
        });

        if (res.data.isLoggedIn) {
          setUserData(res.data.isLoggedIn);
          setAdmin(res.data.admin);
        }

        if (
          res.data.isLoggedIn === false &&
          loc !== "/" &&
          loc !== "/register" &&
          loc !== "/forgot-password" &&
          loc !== "/contact-us" &&
          loc !== "/help" &&
          router.pathname !== "/reset/[resetToken]"
        ) {
          router.replace("/");
          toast.info("Please login to continue", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (
          res.data.isLoggedIn === true &&
          (router.pathname === "/register" ||
            router.pathname === "/forgot-password" ||
            router.pathname === "/")
        ) {
          toast.info("You are already logged in", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/home");
        }
      } catch (err) {
        console.log(err);
        setUserData(err.response.data.isLoggedin);
      }
    }
    fetchData();
  }, [loc]);

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

  const handleLogout = async () => {
    if (userData) {
      setPath("logout");
      setNav("false");

      try {
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
          method: "POST",
          data: {
            token: cookies.get("jwt"),
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data.isLoggedIn);
          if (res.data.isLoggedIn === false) {
            toast.success(res.data.msg, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setTimeout(() => {
            router.push("/");
          }, 1500);
          window.localStorage.removeItem("userId");
          destroyCookie(null, "jwt");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section
      className={nav ? `${styles.nav} ${styles.navActive}` : `${styles.nav}`}
      data-value={path}
    >
      <div
        className={
          nav
            ? `${styles.mobileNav} ${styles.mobActive}`
            : `${styles.mobileNav}`
        }
        onClick={() => {
          setNav((prev) => !prev);
        }}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.up}>
          <div className={styles.heading}>
            <h1>Edyoumatch</h1>
            {/* <img src="/edyoumatch_logo.png" alt="Edyoumatch_logo" /> */}
          </div>
          <div className={styles.pages}>
            <Link href="/home" passHref>
              <a
                className={
                  path === "home" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-home"></i>
                </div>
                Home
              </a>
            </Link>

            <a
              className={
                path === "posts" ? `${styles.active}` : `${styles.link}`
              }
              onClick={() => {
                window.localStorage.setItem("interest", "all");
                setNav(false);
                router.push("/posts");
              }}
            >
              <div className={styles.icon}>
                <i className="fas fa-photo-video"></i>
              </div>
              Explore
            </a>

            <Link href="/saved-interests" passHref>
              <a
                className={
                  path === "saved" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-bookmark"></i>
                </div>
                Saved Interests
              </a>
            </Link>
            <Link href="/scholarships" passHref>
              <a
                className={
                  path === "scholarships"
                    ? `${styles.active}`
                    : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-medal"></i>
                </div>
                Scholarships
              </a>
            </Link>
            <Link href="/edu-loans" passHref>
              <a
                className={
                  path === "loans" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-hands-helping"></i>
                </div>
                Edu-Loans
              </a>
            </Link>
            <Link href="/chats" passHref>
              <a
                className={
                  path === "chats" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-comment-dots"></i>
                </div>
                Chats
              </a>
            </Link>
            <Link href="/help" passHref>
              <a
                className={
                  path === "help" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-question"></i>
                </div>
                Help
              </a>
            </Link>
            <Link href="/contact-us" passHref>
              <a
                className={
                  path === "contact" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                Contact Us
              </a>
            </Link>
            <Link href="/profile" passHref>
              <a
                className={
                  path === "settings" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-cog"></i>
                </div>
                Settings
              </a>
            </Link>
            <Link href="/admins" passHref>
              <a
                className={
                  path === "admins" ? `${styles.active}` : `${styles.link}`
                }
                onClick={() => {
                  setNav(false);
                }}
                style={admin ? { display: "flex" } : { display: "none" }}
              >
                <div className={styles.icon}>
                  <i className="fas fa-user-cog"></i>
                </div>
                Admin
              </a>
            </Link>
            <a
              className={
                path === "logout" ? `${styles.active}` : `${styles.link}`
              }
              onClick={handleLogout}
            >
              <div className={styles.icon}>
                <i className="fas fa-sign-out-alt"></i>
              </div>
              Logout
            </a>
          </div>
        </div>
        <div className={styles.down}>
          <img src="/NavBarImg.svg" alt="NavBarImage" />
        </div>
      </div>
    </section>
  );
};

export default NavBar;
