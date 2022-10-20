import { useState, useEffect } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { HOME } from "../../utils/paths";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

import userIcon from "../../assets/user.svg";

type Props = {
  currentUser: {
    name: string;
    email: string;
    Phone: string;
    image: string;
    bio: string;
    password: string;
  };
  setCurrentUser: any;
};

const Editform = ({ setCurrentUser, currentUser }: Props) => {
  const [user, loading, error]: any = useAuthState(auth);
  const [file, setFile] = useState<any>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const { name, image, bio, email, password } = currentUser;

  const uploadImage = (event: any) => {
    setFile(event.target.files[0]);
  };

  const updateAvatar = () => {
    const storageRef = ref(storage, `/files/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    file?.name &&
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () =>
          // download url
          getDownloadURL(uploadTask?.snapshot?.ref).then((url: string) => {
            file?.name && setNewImage(url);
          })
      );
  };

  useEffect(() => {
    updateAvatar();
  }, [file?.name]);

  const onSubmitChanges = async (event: any) => {
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
          console.log("Email updated");
        })
        .catch((error) => {
          alert(error);
        });

    newPassword &&
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password updated");
        })
        .catch((error) => {
          alert(error);
        });

    setCurrentUser({
      ...currentUser,
      name: newName || name,
      image: newImage || image,
    });
  };

  return (
    <div className="edit-form">
      <h3>{percent}</h3>
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
              id="name"
              placeholder="Enter your name..."
              className=""
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <label htmlFor="bio">
            Bio
            <textarea
              id="bio"
              placeholder="Enter your bio..."
              className=""
              onChange={(e) => setNewBio(e.target.value)}
            />
          </label>
          <label htmlFor="phone">
            Phone
            <input
              id="phone"
              placeholder="Enter your phone..."
              className=""
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              placeholder="Enter your email..."
              className=""
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              placeholder="Enter your password..."
              className=""
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button className="edit-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Editform;
