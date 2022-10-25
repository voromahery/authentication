import { useContext, useRef } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { HOME } from "../../utils/paths";
import { Context } from "../../global-context";
import userIcon from "../../assets/user.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

const Editform = () => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const {
    user,
    file,
    percent,
    currentUser,
    setCurrentUser,
    newImage,
    newName,
    setNewName,
    newBio,
    setNewBio,
    newPhone,
    setNewPhone,
    newEmail,
    setNewEmail,
    newPassword,
    setNewPassword,
    setMessage,
    uploadImage,
  }: any = useContext(Context);

  const { name, image, id, email, bio, phone } = currentUser;

  const isEnabled =
    newImage || newName || newBio || newPhone || newPassword || newEmail;

  const updateBio = async () => {
    const userRef = await doc(db, "users", id);
    return updateDoc(userRef, { bio: newBio });
  };

  const updatePhoneNumber = async () => {
    const userRef = await doc(db, "users", id);
    return updateDoc(userRef, { phone: newPhone });
  };

  const onSubmitChanges = (event: any) => {
    event.preventDefault();

    if (file?.name) {
      updateProfile(user, {
        photoURL: newImage,
      });
    }

    if (newName) {
      updateProfile(user, {
        displayName: newName ? newName : name,
      });
    }

    if (file?.name && newName) {
      updateProfile(user, {
        displayName: newName ? newName : name,
        photoURL: file?.name ? newImage : name,
      });
    }

    newEmail &&
      updateEmail(user, newEmail)
        .then(() => {
          setMessage("Profile updated");
        })
        .catch((error) => {
          alert(error);
          setMessage({ status: "error", message: "An error occurred" });
        });

    newPassword &&
      updatePassword(user, newPassword)
        .then(() => {
          setMessage("Profile updated");
        })
        .catch((error) => {
          alert(error);
          setMessage({ status: "error", message: "An error occurred" });
        });

    newBio && updateBio();

    newPhone && updatePhoneNumber();

    setCurrentUser({
      ...currentUser,
      name: newName || name,
      image: newImage || image,
      email: newEmail || email,
      bio: newBio || bio,
      phone: newPhone || phone,
    });

    isEnabled && navigateRef.current(HOME, { replace: true, state: null });

    setMessage({ status: "success", message: "Profile updated" });

    setTimeout(() => {
      setMessage({ status: "", message: "" });
    }, 2000);
  };

  return (
    <div className="edit-form">
      {file?.name && percent < 100 && (
        <div className="modal-wrapper">
          <div className="upload-modal">
            <h3>Uploading: {percent}%</h3>
            <progress value={percent} max="100" />
          </div>
        </div>
      )}
      <Link to={HOME} className="back-link">
        Back
      </Link>
      <form onSubmit={onSubmitChanges} className="container">
        <header className="edit-header">
          <h2 className="heading">Change Info</h2>
          <p className="paragraph">
            Changes will be reflected to every service
          </p>
        </header>
        <div className="wrapper">
          <label htmlFor="avatar" className="image-wrapper">
            <img
              src={image ? newImage || image : userIcon}
              alt={`${name} avatar`}
              className={`image-to-change ${!image ? "no-image" : ""}`}
            />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={uploadImage}
          />
          <span className="image-to-change-text"> Change photo</span>
        </div>
        <div className="form">
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              placeholder="Enter your name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <label htmlFor="bio">
            Bio
            <textarea
              id="bio"
              placeholder="Enter your bio..."
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </label>
          <label htmlFor="phone">
            Phone
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone..."
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              placeholder="Enter your email..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button className="edit-button" disabled={!isEnabled}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editform;
