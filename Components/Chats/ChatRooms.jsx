import { useContext, useState } from "react";
import { ChatContext } from "../PagesContext";
import styles from "../../styles/ChatsStyle/ChatRoom.module.css";

const ChatRooms = () => {
  const [chat, setChat] = useContext(ChatContext);

  return (
    <div className={styles.box2}>
      <div className={styles.chatRooms}>
        <h3>Chats</h3>
        <div className={styles.search}>
          <div>
            <input type="text" name="Search" placeholder="Search...." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className={styles.messages}>
          <div
            className={styles.peoples}
            onClick={() => {
              setChat(true);
            }}
          >
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
          <div className={styles.peoples}>
            <div className={styles.userImg}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.userInfo}>
              <h2>Tarun Koli</h2>
              <p>hey there, i have something t....</p>
            </div>
            <div className={styles.date}>
              <p>13 July</p>
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
