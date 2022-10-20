import "./index.scss";
import { Link } from "react-router-dom";
import { Props } from "../../App";
import { EDIT } from "../../utils/paths";
import UserInitial from "../../components/initial/index";

const Details = ({ currentUser }: Props) => {
  const { name, image, bio, email, password } = currentUser;
  return (
    <div className="details">
      <header className="details-header">
        <h2 className="heading">Personal info</h2>
        <p className="paragraph">Basic info, like your name and photo</p>
      </header>

      <div className="wrapper">
        <div className="extra-info">
          <div className="wrapper">
            <h3 className="title">profile</h3>
            <p className="paragraph">
              Some info may be visible to other people
            </p>
          </div>
          <Link className="edit-button" to={EDIT}>
            Edit
          </Link>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Photo</td>
              <td className="image-wrapper">
                {image ? (
                  <img src={image} alt={`${name} avatar`} />
                ) : (
                  <UserInitial name={name} />
                )}
              </td>
            </tr>
            {name && (
              <tr>
                <td>Name</td>
                <td>
                  <b>{name}</b>
                </td>
              </tr>
            )}
            {bio && (
              <tr>
                <td>Bio</td>
                <td>
                  <b>{bio}</b>
                </td>
              </tr>
            )}
            {email && (
              <tr>
                <td>Email</td>
                <td>
                  <b>{email}</b>
                </td>
              </tr>
            )}
            {password && (
              <tr>
                <td>Password</td>
                <td>
                  <b>{password}</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
