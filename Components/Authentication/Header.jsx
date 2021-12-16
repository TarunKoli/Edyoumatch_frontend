import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.navbar}>
      <div>
        <Link href="/help">
          <li>Help</li>
        </Link>
        <Link href="/contact-us">
          <li>Contact&nbsp;us</li>
        </Link>
        <Link href="https://firebasestorage.googleapis.com/v0/b/edyoumatch-22576.appspot.com/o/Privacy%20Policy.pdf?alt=media&token=420e94e2-58a2-43aa-b04c-fbaac2966eb0">
          <li>Privacy&nbsp;Policy</li>
        </Link>
      </div>
      {props.mode !== "contact" ? (
        <div>
          <Link href="/">
            <a className={styles.active}>Sign In</a>
          </Link>
          <Link href="/register">
            <a className={styles.btnActive}>Register</a>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Header;
