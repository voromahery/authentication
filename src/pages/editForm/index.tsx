import { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Props } from "../../App";
import { HOME } from "../../utils/paths";
import UserInitial from "../../components/initial/index";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Editform = ({ data }: Props) => {
  const [newImage, setNewImage] = useState<any>("");
  const [newName, setNewName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const { name, image, bio, email, password } = data;

  const uploadImage = (event: any) => {
    setNewImage(event.target.files[0]);
    const storageRef = ref(storage, `/files/${newImage?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, newImage);

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
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
          console.log(url);
          setNewImage(url)
        });
      }
    );
  };

  return (
    <div className="edit-form">
      <Link to={HOME} className="back-link">
        Back
      </Link>
      <div className="container">
        <header className="edit-header">
          <h2 className="heading">Change Info</h2>
          <p className="paragraph">
            Changes will be reflected to every service
          </p>
        </header>
        <div className="wrapper">
          <label htmlFor="avatar" className="image-wrapper">
            {image ? (
              <img
                src={image}
                alt={`${name} avatar`}
                className="image-to-change"
              />
            ) : (
              <UserInitial name={name} />
            )}
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
        <form className="form">
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
        </form>
      </div>
    </div>
  );
};

export default Editform;
