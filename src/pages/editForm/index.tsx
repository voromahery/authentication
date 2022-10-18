import { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Props} from "../../App";
import { HOME } from "../../utils/paths";
import UserInitial from '../../components/initial/index';

const Editform = ({ data }: Props) => {
  const [newName, setNewName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { name, image, bio, email, password } = data;

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
          <div className="image-wrapper">
            {image ? (
              <img
                src={image}
                alt={`${name} avatar`}
                className="image-to-change"
              />
            ) : (
              <UserInitial name={name} />
            )}
          </div>
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
