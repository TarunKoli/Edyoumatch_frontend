import { useContext, useState, useEffect } from "react";
import styles from "../../styles/Profile/Profile.module.css";
import { ProfileContext } from "../PagesContext";
import { storage } from "../../firebase";
import cookies from "nookies";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSettings = () => {
  const [profile, setProfile] = useContext(ProfileContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [readonly, setReadonly] = useState(true);
  const [deg, setDeg] = useState(false);
  const [bio, setBio] = useState(false);
  const [degrees, setDegrees] = useState([]);
  const [bios, setBios] = useState([]);
  const [education, setEducation] = useState("");
  const [hobbie, setHobbie] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUser/${
        cookies.get("jwt").jwt
      }`
    );
    const user = await res.json();
    setFirstname(user.data.name.split(" ")[0]);
    setLastname(user.data.name.split(" ")[1]);
    setEmail(user.data.email);
    setDegrees(user.data.degrees);
    setBios(user.data.bio);
    setProfileImg(user.data.profileImg);
    setOldImage(user.data.profileImg);
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

  const appendDegree = () => {
    if (education) {
      let temp = [...degrees];
      temp.push(education);
      setDegrees(temp);
      setEducation("");
      setDeg(false);
    }
  };

  const removeDegree = (val) => {
    const result = degrees.filter((degree) => {
      return degree !== val;
    });
    setDegrees(result);
  };

  const appendBio = () => {
    if (hobbie) {
      let temp = [...bios];
      temp.push(hobbie);
      setBios(temp);
      setHobbie("");
      setBio("");
    }
  };

  const removeBio = (val) => {
    const result = bios.filter((bio) => {
      return bio !== val;
    });
    setBios(result);
  };

  const uploadImage = () => {
    const storageRef = storage.ref(`profileImages/${image.name}`).put(image);
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
          .ref("profileImages")
          .child(image.name)
          .getDownloadURL()
          .then((imgUrl) => {
            setProfileImg(imgUrl);
            send(imgUrl);
            removeDbPic();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  const handleSave = async () => {
    if (oldImage !== profileImg) {
      uploadImage();
    } else {
      send(oldImage);
    }
  };

  const send = async (imgUrl) => {
    try {
      const res = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateUser`,
        method: "PATCH",
        data: {
          token: cookies.get("jwt"),
          name: firstname + " " + lastname,
          email: email,
          degrees: degrees,
          bios: bios,
          profileImg: imgUrl,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 3000,
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

  const removeDbPic = () => {
    let imageRef = storage.refFromURL(oldImage);
    imageRef
      .delete()
      .then(() => {
        console.log("Successfully Saved !");
      })
      .catch((err) => {
        setError("Unexpected error occured !");
      });
  };

  return (
    <div
      className={styles.account}
      style={profile ? { left: 0 + "%" } : { left: 120 + "%" }}
    >
      <div className={styles.heading}>
        <button
          onClick={() => {
            setProfile(false);
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Account Settings</h1>
      </div>
      <div className={styles.midBox}>
        <div className={styles.firstBox}>
          <div className={styles.status}>
            <h1>Personal Information</h1>
            <p>Lorem ipsum dolor sit met, consetur adispcing</p>
          </div>
          <div className={styles.following}>
            <div>
              <p>Follows</p>
              <h1>789</h1>
            </div>
            <div>
              <p>Following</p>
              <h1>432</h1>
            </div>
            <div>
              <p>Chat</p>
              <i className="fas fa-comments"></i> <i></i>
            </div>
          </div>
        </div>
        <div className={styles.secondBox}>
          <div className={styles.image}>
            {profileImg ? (
              <img src={profileImg} alt="ProfileImage" />
            ) : (
              <i className="far fa-user-circle"></i>
            )}
            <div className={styles.camera}>
              <i className="fas fa-camera fa-2x"></i>
              <input
                type="file"
                name="pic"
                onChange={(e) => {
                  setProfileImg(URL.createObjectURL(e.target.files[0]));
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className={styles.name}>
            <div className={styles.inputs}>
              <label htmlFor="FirstName">Firstname</label>
              <input
                type="text"
                name="FirstName"
                value={firstname}
                spellCheck="false"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                onFocus={() => {
                  setReadonly(false);
                }}
                onMouseLeave={() => {
                  setReadonly(true);
                }}
                readOnly={readonly}
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="LastName">Lastname</label>
              <input
                type="text"
                name="LastName"
                value={lastname}
                spellCheck="false"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                onFocus={() => {
                  setReadonly(false);
                }}
                onMouseLeave={() => {
                  setReadonly(true);
                }}
                readOnly={readonly}
              />
            </div>
          </div>
        </div>
        <div className={styles.thirdBox}>
          <div className={styles.inputs} data-value="Email">
            <label htmlFor="Email">Email Address</label>
            <input
              type="email"
              name="Email"
              value={email}
              spellCheck="false"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => {
                setReadonly(false);
              }}
              onMouseLeave={() => {
                setReadonly(true);
              }}
              readOnly={readonly}
            />
          </div>
        </div>
        <div className={styles.fourthBox}>
          <div className={styles.education}>
            <p>Education</p>
            <div className={styles.achievments}>
              {degrees.map((val, i) => {
                return (
                  <div key={i}>
                    {val + " "}{" "}
                    <i
                      className="far fa-times-circle"
                      onClick={() => {
                        removeDegree(val);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <div className={styles.degrees}>
              <textarea
                name="degree"
                style={
                  deg
                    ? { width: "83%", display: "block" }
                    : { width: "0%", display: "none" }
                }
                value={education}
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
              ></textarea>
              <button
                style={deg ? { width: "15%" } : { width: "100%" }}
                onClick={(e) => {
                  setDeg(true);
                  appendDegree();
                }}
              >
                {deg ? "+" : "Add +"}
              </button>
            </div>
          </div>
          <div className={styles.bio}>
            <p>Bio</p>
            <div className={styles.favs}>
              {bios.map((val, i) => {
                return (
                  <div key={i}>
                    {val}
                    <i
                      className="far fa-times-circle"
                      onClick={() => {
                        removeBio(val);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <div className={styles.degrees}>
              <textarea
                name="degree"
                style={
                  bio
                    ? { width: "83%", display: "block" }
                    : { width: "0%", display: "none" }
                }
                value={hobbie}
                onChange={(e) => {
                  setHobbie(e.target.value);
                }}
              ></textarea>
              <button
                style={bio ? { width: "15%" } : { width: "100%" }}
                onClick={(e) => {
                  setBio(true);
                  appendBio();
                }}
              >
                {bio ? "+" : "Add +"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.fifthBox}>
        <div>Discard Changes</div>
        <div onClick={handleSave}>Save Changes</div>
      </div>
    </div>
  );
};

export default AccountSettings;
