import { useContext, useEffect } from "react";
import Router from "next/router";
import { PathContext } from "../PagesContext";
import styles from "../../styles/Fallback.module.css";
const Fallback404 = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("auth");
    //eslint-disable-next-line
  }, []);
  return (
    <div className={styles.error}>
      <div>
        <h1>
          Link Expired ! <br /> Try to Register again
        </h1>
        <button
          onClick={() => {
            Router.push("/register");
          }}
        >
          Register Again
        </button>
      </div>
    </div>
  );
};

export default Fallback404;
