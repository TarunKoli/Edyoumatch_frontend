import { useState, useEffect } from "react";
import styles from "../../styles/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ContactForm = () => {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

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

  const handleQuery = async () => {
    if (!name) {
      return setError("Please provide your name");
    }
    if (!email) {
      return setError("Please provide your email");
    }
    if (!subject) {
      return setError("Please provide a subject");
    }
    if (!query) {
      return setError("Please provide your query");
    }

    try {
      const data = {
        name: name,
        email: email,
        subject: subject,
        query: query,
      };
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/contact-us`,
        method: "POST",
        data: data,
        withCredentials: true,
      });

      if (res.status === 200) {
        setName("");
        setEmail("");
        setSubject("");
        setQuery("");
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className={styles.form} data-value="contact">
      <div>
        <h1>Let&apos;s connect</h1>
        <div className={styles.person}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <input
          type="text"
          name="Subject"
          placeholder="Subject"
          className={styles.subject}
          data-value="contact"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <textarea
          name="query"
          placeholder=" Your Query....."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></textarea>
        <button onClick={handleQuery}>
          Send <i className="far fa-paper-plane"></i>
        </button>
      </div>
      <div className={styles.bottomBox}>
        <div className={styles.logos}>
          <div>
            <i className="fab fa-instagram"></i>
          </div>
          <div>
            <i className="fab fa-facebook-f"></i>
          </div>
          <div>
            <i className="fab fa-whatsapp"></i>
          </div>
        </div>
        <div className={styles.support}>
          <div>
            <h2>Address</h2>
            <p>
              151 New Park Ave,
              <br />
              Hartford, CT 06106,
              <br />
              United States
            </p>
          </div>
          <div>
            <h2>Support</h2>
            <p>
              abc@gmail.com
              <br />
              +21 98-456-343
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
