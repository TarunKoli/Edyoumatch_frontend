import { useContext } from "react";
import styles from "../../styles/ChatsStyle/ChatBox.module.css";
import { ChatContext } from "../PagesContext";

const ChatBox = () => {
  const [chat, setChat] = useContext(ChatContext);

  return (
    <div
      className={styles.box1}
      style={chat ? { left: 0 + "%" } : { left: 120 + "%" }}
    >
      <div className={styles.chatBox}>
        <div className={styles.userDetails}>
          <div className={styles.inline}>
            <div
              className={styles.mobileBack}
              onClick={() => {
                setChat(false);
              }}
            >
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className={styles.image}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.nameInfo}>
              <h1>Tarun Koli</h1>
              <p>Active 3m ago</p>
            </div>
          </div>
          <div className={styles.options}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <div className={styles.chatArea}>
          <div className={styles.msgCover}>
            <div className={styles.msg}>
              hello computer this side,hello computer this side,hello computer
              this side,hello computer this side hello computer this side
            </div>
          </div>

          <div className={styles.userMsgCover}>
            <div className={styles.userMsg}>hello tarun this side</div>
          </div>
          <div className={styles.msgCover}>
            <div className={styles.msg}>hello computer this side,</div>
          </div>
          <div className={styles.userMsgCover}>
            <div className={styles.userMsg}>
              hello computer this side,hello computer this side,hello computer
              this side,hello computer this side hello computer this side
            </div>
          </div>
        </div>
        <div className={styles.inputBar}>
          <div className={styles.mic}>
            <i className="fas fa-microphone"></i>
          </div>
          <div className={styles.typeMsg}>
            <input
              type="text"
              name="Message"
              placeholder="Type something...."
            />
          </div>
          <div className={styles.emoji}>
            <i className="far fa-smile-beam"></i>
          </div>
          <div className={styles.attachment}>
            <i className="fas fa-paperclip"></i>
          </div>
          <div className={styles.send}>
            <i className="far fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
