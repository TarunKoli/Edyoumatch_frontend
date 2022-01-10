import { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Help.module.css";
import { PathContext } from "../PagesContext";

const Help = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("help");
    //eslint-disable-next-line
  }, []);
  return (
    <section className={styles.help}>
      <div className={styles.upBox}>
        <div className={styles.leftImg}>
          <img src="/Help-Img1.svg" alt="HelpImage" />
        </div>
        <div className={styles.mid}>
          <div className={styles.colorBlur}></div>
          <div className={styles.helpInfo}>
            <h3>Help & Support</h3>
            <h3>How can we help you ?</h3>
            <div className={styles.search}>
              <input
                type="text"
                name="Help"
                placeholder="Search for answers...."
              />
              <button>Search</button>
            </div>
            <h1>Edyoumatch</h1>
            <h2>See our most frequently asked question....</h2>
          </div>
          <div className={styles.mobile}>
            <h2>Suggestion : </h2>
            <div className={styles.links2}>
              <a>Account</a>
              <a>Privacy policies</a>
              <a>About us</a>
              <a>Security</a>
              <a>Our Collaborations</a>
              <a>Change password</a>
              <a>Change username</a>
            </div>
          </div>
        </div>
        <div className={styles.rightImg}>
          <div className={styles.links}>
            <Link href="/home" passHref>
              <a>Home</a>
            </Link>
            <Link href="contact-us" passHref>
              <a>Contact us</a>
            </Link>
          </div>
          <img src="/Help-Img2.svg" alt="HelpImage" />
        </div>
      </div>
      <div className={styles.lowBox}>
        <div>
          <h1>About us</h1>
          <p>
            Everything you need to know about us, our company, our motive and
            target.
          </p>
        </div>
        <div>
          <h1>Account</h1>
          <p>Details about your account, setting up your account...</p>
        </div>
        <div>
          <h1>Privacy</h1>
          <p>Having some privacy issue, we can help you right away.</p>
        </div>
      </div>
    </section>
  );
};

export default Help;
