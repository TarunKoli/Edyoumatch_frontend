import { useContext, useEffect } from "react";
import styles from "../../styles/Profile/Profile.module.css";
import Settings from "./Settings/Settings";
import AccountSettings from "./AccountSettings";
import { PathContext } from "../PagesContext";

const Profile = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("settings");
    //eslint-disable-next-line
  }, []);
  return (
    <section className={styles.profile}>
      <div className={styles.profileBody}>
        <div className={styles.wrap}>
          <Settings />
          <AccountSettings />
        </div>
      </div>
    </section>
  );
};

export default Profile;
