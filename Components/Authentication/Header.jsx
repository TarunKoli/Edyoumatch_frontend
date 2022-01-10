import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.navbar}>
      <div>
        {/* <img src="/edyoumatch_logo.png" alt="Edyoumatch_Logo" /> */}
        <Link href="/help" passHref>
          <li>Help</li>
        </Link>
        <Link href="/contact-us" passHref>
          <li>Contact&nbsp;us</li>
        </Link>
        <Link
          href="https://firebasestorage.googleapis.com/v0/b/edyoumatch-22576.appspot.com/o/Privacy%20Policy.pdf?alt=media&token=420e94e2-58a2-43aa-b04c-fbaac2966eb0"
          passHref
        >
          <li>Privacy&nbsp;Policy</li>
        </Link>
      </div>
      {props.mode !== "contact" ? (
        <div>
          <Link href="/" passHref>
            <a className={styles.active}>Sign In</a>
          </Link>
          <Link href="/register" passHref>
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
