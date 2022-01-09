import { useState, useEffect, useContext } from "react";
import { storage } from "../../firebase";
import axios from "axios";
import cookies from "nookies";
import { PathContext } from "../PagesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Admins.module.css";
import Interests from "./Interest.json";

const CreatePost = () => {
  const [error, setError] = useState(null);
  const [path, setPath] = useContext(PathContext);
  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [alumni, setAlumni] = useState("");
  const [interest, setInterest] = useState("");
  const [alumnis, setAlumnis] = useState([]);
  const [scholarship, setScholarship] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [winter, setWinter] = useState({ start: "", end: "" });
  const [summer, setSummer] = useState({ start: "", end: "" });
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [world, setWorld] = useState([]);
  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false);
  var save = [];

  useEffect(async () => {
    setPath("admins");
    const data = await fetch(
      `https://countriesnow.space/api/v0.1/countries/flag/images`
    );
    const list = await data.json();
    setWorld(list.data);
  }, []);

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

  useEffect(() => {
    if (
      name &&
      location &&
      description &&
      fees &&
      interest &&
      courses.length &&
      imgs.length &&
      alumnis.length &&
      scholarships.length
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    name,
    location,
    courses,
    alumnis,
    scholarships,
    imgs,
    description,
    fees,
    winter,
    summer,
    interest,
  ]);

  var months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemeber",
    "December",
  ];

  function addCourse() {
    if (!course) {
      return;
    }
    courses.push({ name: course, link: link });
    let temp = [...courses];
    setCourses(temp);
    setCourse("");
    setLink("");
  }
  function removeCourse(name) {
    let temp = courses.filter((val) => {
      return val.name !== name;
    });
    setCourses(temp);
  }
  function addAlumni() {
    if (!alumni) {
      return;
    }
    alumnis.push(alumni);
    let temp = [...alumnis];
    setAlumnis(temp);
    setAlumni("");
  }
  function removeAlumni(name) {
    let temp = alumnis.filter((val) => {
      return val !== name;
    });
    setAlumnis(temp);
  }
  function addScholarship() {
    if (!scholarship) {
      return;
    }
    scholarships.push({ name: scholarship, link: link2 });
    let temp = [...scholarships];
    setScholarships(temp);
    setScholarship("");
    setLink2("");
  }
  function removeScholarship(name) {
    let temp = scholarships.filter((val) => {
      return val.name !== name;
    });
    setScholarships(temp);
  }
  function addImgs(pics) {
    if (imgs.length > 6 || 6 - (imgs.length - 1) <= pics.length) {
      return alert("Max allowed Images : 6");
    }
    let temp = [];
    for (let i = 0; i < pics.length; i++) {
      temp.push({ img: pics[i], view: URL.createObjectURL(pics[i]) });
    }
    temp = [...imgs, ...temp];
    setImgs(temp);
  }
  function removeImg(val) {
    let temp = imgs.filter((pic) => {
      return pic.view !== val;
    });
    setImgs(temp);
  }

  const searchCountry = (country) => {
    const result = world.filter((val) => {
      if (
        val.name.slice(0, country.length).toLowerCase() ===
        country.toLowerCase()
      )
        return val;
    });

    setCountries(result);
  };

  const searchInterest = (interest) => {
    const result = Interests.filter((val) => {
      if (
        val.slice(0, interest.length).toLowerCase() === interest.toLowerCase()
      )
        return val;
    });
    setTypes(result);
  };

  const handleSave = () => {
    setLoader(true);
    imgs.forEach((pics) => {
      const storageRef = storage.ref(`images/${pics.img.name}`).put(pics.img);
      storageRef.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(pics.img.name)
            .getDownloadURL()
            .then((imgUrl) => {
              // console.log(imgUrl);
              // setUrl(imgUrl);
              handleUpload(imgUrl);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    });
  };

  const handleUpload = (url) => {
    save.push(url);
    if (save.length === imgs.length) {
      Send();
    }
  };

  const handleClose = () => {
    setActive(false);
    setName("");
    setLocation("");
    setCourse("");
    setAlumni("");
    setScholarship("");
    setCountries([]);
    setTypes([]);
    save = [];
    setCourses([]);
    setImgs([]);
    setScholarships([]);
    setAlumnis([]);
    setLoader(false);
    setWinter({ start: "", end: "" });
    setSummer({ start: "", end: "" });
    setDescription("");
    setInterest("");
    setFees("");
  };

  const Send = async () => {
    const data = {
      name: name,
      location: location,
      description: description,
      fees: fees,
      interest: interest,
      winterIntake: winter,
      summerIntake: summer,
      courses: courses,
      alumnis: alumnis,
      scholarships: scholarships,
      imgs: save,
      token: cookies.get("jwt"),
    };
    console.log(data);
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/createPost`,
        method: "POST",
        data: data,
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoader(false);
        handleClose();
      }
      setLoader(false);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className={styles.admins}>
      <div className={styles.adminBody}>
        <div className={active ? `${styles.modal}` : `${styles.modalActive}`}>
          <div className={styles.createPost}>
            <div className={styles.upSide}>
              <div className={styles.heading}>
                <h1>Create a post</h1>
                <span onClick={handleClose}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className={styles.fields}>
                <div className={styles.field1}>
                  <div className={styles.fieldWrapper}>
                    <label htmlFor="title">College Name</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Add a College Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Add Location"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (e.target.value) {
                          searchCountry(e.target.value);
                        } else {
                          setCountries([]);
                        }
                      }}
                    />
                    <div
                      className={styles.suggestions}
                      style={
                        countries.length
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {countries.map((val, i) => {
                        return (
                          <div
                            key={i}
                            className={styles.country}
                            onClick={() => {
                              setLocation(val.name);
                              setCountries([]);
                            }}
                          >
                            <img src={val.flag} />
                            <p>{val.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.field2}>
                  <div className={styles.addCourse}>
                    <label htmlFor="course">Courses</label>
                    <div className={styles.content}>
                      {courses.map((val, key) => {
                        return (
                          <div key={key}>
                            <i
                              className="far fa-times-circle"
                              onClick={() => {
                                removeCourse(val.name);
                              }}
                            ></i>
                            <a href={val.link} target="_blank">
                              {val.name}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className={
                        course
                          ? `${styles.linkCover} ${styles.linkActive}`
                          : `${styles.linkCover}`
                      }
                    >
                      <div className={styles.wrap}>
                        <div className={styles.fieldWrapper}>
                          <input
                            type="text"
                            name="course"
                            placeholder="Course Name"
                            value={course}
                            onChange={(e) => {
                              setCourse(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.wrap} data-value="link">
                        <div className={styles.fieldWrapper}>
                          <input
                            type="url"
                            name="course link"
                            placeholder="Add a link (optional)"
                            value={link}
                            onChange={(e) => {
                              setLink(e.target.value);
                            }}
                          />
                        </div>
                        <button onClick={addCourse}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.addCourse}>
                    <label htmlFor="scholarships">Scholarships</label>
                    <div className={styles.content}>
                      {scholarships.map((val, key) => {
                        return (
                          <div key={key}>
                            <i
                              className="far fa-times-circle"
                              onClick={() => {
                                removeScholarship(val.name);
                              }}
                            ></i>
                            <a href={val.link} target="_blank">
                              {val.name}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className={
                        scholarship
                          ? `${styles.linkCover} ${styles.linkActive}`
                          : `${styles.linkCover}`
                      }
                    >
                      <div className={styles.wrap}>
                        <div className={styles.fieldWrapper}>
                          <input
                            type="text"
                            name="scholarships"
                            placeholder="Scholarship Name"
                            value={scholarship}
                            onChange={(e) => {
                              setScholarship(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.wrap} data-value="link">
                        <div className={styles.fieldWrapper}>
                          <input
                            type="url"
                            name="Scholarship link"
                            placeholder="Add a link (optional)"
                            value={link2}
                            onChange={(e) => {
                              setLink2(e.target.value);
                            }}
                          />
                        </div>
                        <button onClick={addScholarship}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.field3}>
                  <div className={styles.addCourse}>
                    <label htmlFor="alumni">Alumni</label>
                    <div className={styles.content}>
                      {alumnis.map((val, key) => {
                        return (
                          <div key={key}>
                            <i
                              className="far fa-times-circle"
                              onClick={() => {
                                removeAlumni(val);
                              }}
                            ></i>
                            <p>{val}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.wrap} data-value="link">
                      <div className={styles.fieldWrapper}>
                        <input
                          type="text"
                          name="alumni"
                          placeholder="Alumni Name"
                          value={alumni}
                          onChange={(e) => {
                            setAlumni(e.target.value);
                          }}
                        />
                      </div>
                      <button onClick={addAlumni}>+</button>
                    </div>
                  </div>
                  <div className={styles.addmission}>
                    <div className={styles.winter}>
                      <p>Winter Intake</p>
                      <select
                        name="winterIn"
                        onChange={(e) => {
                          setWinter({ start: e.target.value, end: winter.end });
                        }}
                      >
                        <option value="">-month-</option>
                        {months.map((month, i) => {
                          return (
                            <option key={i} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                      -
                      <select
                        name="winterIn"
                        onChange={(e) => {
                          setWinter({
                            start: winter.start,
                            end: e.target.value,
                          });
                        }}
                      >
                        <option value="">-month-</option>
                        {months.map((month, i) => {
                          return (
                            <option key={i} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={styles.winter}>
                      <p>Summer Intake</p>
                      <select
                        name="summerIn"
                        onChange={(e) => {
                          setSummer({ start: e.target.value, end: summer.end });
                        }}
                      >
                        <option value="">-month-</option>
                        {months.map((month, i) => {
                          return (
                            <option key={i} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                      -
                      <select
                        name="summerIn"
                        onChange={(e) => {
                          setSummer({
                            start: summer.start,
                            end: e.target.value,
                          });
                        }}
                      >
                        <option value="">-month-</option>
                        {months.map((month, i) => {
                          return (
                            <option key={i} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles.field5}>
                  <div className={styles.description}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className={styles.fees}>
                    <div>
                      <label htmlFor="fees">Fees</label>
                      <input
                        type="text"
                        name="fees"
                        placeholder="Amount"
                        value={fees}
                        onChange={(e) => {
                          setFees(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styles.hobbie}>
                      <label htmlFor="interest">Interest</label>
                      <input
                        type="text"
                        name="interest"
                        placeholder="Interest"
                        value={interest}
                        onChange={(e) => {
                          setInterest(e.target.value);
                          if (e.target.value) {
                            searchInterest(e.target.value);
                          } else {
                            setTypes([]);
                          }
                        }}
                      />
                      <div
                        className={styles.suggestions}
                        style={
                          types.length
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        {types.map((val, i) => {
                          return (
                            <div
                              key={i}
                              className={styles.country}
                              onClick={() => {
                                setInterest(val);
                                setTypes([]);
                              }}
                            >
                              <p>{val}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.field4}>
                  <label htmlFor="images">Add Images</label>
                  <div className={styles.fileWrap}>
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={(e) => {
                        if (e.target.files.length > 6) {
                          alert("max 6 images are allowed");
                          e.target.value = "";
                        }
                        addImgs(e.target.files);
                      }}
                    />
                  </div>
                  <div className={styles.selected}>
                    {imgs.map((val, i) => {
                      return (
                        <div key={i}>
                          <i
                            className="far fa-times-circle"
                            onClick={() => {
                              removeImg(val.view);
                            }}
                          ></i>
                          <img src={val.view} alt="SelectedImg" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.downSide}>
              <button onClick={handleClose} disabled={loader ? true : false}>
                Close
              </button>
              <button onClick={handleSave} disabled={disable}>
                {loader ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Create Post"
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={styles.create}
          onClick={() => {
            setActive(true);
          }}
        >
          +
        </div>
        <div className={styles.adminPosts}>
          <h3>Admin Section</h3>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
