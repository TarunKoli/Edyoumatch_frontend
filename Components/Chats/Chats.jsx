import { useContext, useEffect } from "react";
import ChatBox from "./ChatBox";
import ChatRooms from "./ChatRooms";
import styles from "../../styles/ChatsStyle/Chats.module.css";
import { PathContext } from "../PagesContext";

const Chats = () => {
  const [path, setPath] = useContext(PathContext);
  useEffect(() => {
    setPath("chats");
  }, []);
  return (
    <section className={styles.chats}>
      <div className={styles.chatsBody}>
        <div className={styles.wrap}>
          <ChatBox />
          <ChatRooms />
        </div>
      </div>
    </section>
  );
};

export default Chats;
