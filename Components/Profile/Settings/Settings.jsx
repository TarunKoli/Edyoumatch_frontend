import { useContext, useState } from "react";
import styles from "../../../styles/Profile/Profile.module.css";
import CompleteProfile from "./CompleteProfile";
import Friends from "./Friends";
import SavedPost from "./SavedPost";
import ManageAccount from "./ManageAccount";
import LikedPost from "./LikedPosts";
import Interest from "./Interest";
import UserPost from "./UserPosts";
import { ProfileContext } from "../../PagesContext";

const Settings = () => {
  const [profile, setProfile] = useContext(ProfileContext);

  return (
    <div className={styles.settings}>
      <div className={styles.mobile}>
        <h1>Settings</h1>
        <button
          onClick={() => {
            setProfile(true);
          }}
        >
          Profile Settings
        </button>
      </div>
      <div className={styles.options}>
        <CompleteProfile />
        <Friends />
        <SavedPost />
        <ManageAccount />
        <LikedPost />
        <Interest />
        <UserPost />
      </div>
    </div>
  );
};

export default Settings;
