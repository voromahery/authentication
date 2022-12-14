import { useEffect, useState, useRef, useContext } from "react";
import "./index.scss";
import { logout } from "../../firebase";
import { Context } from "../../global-context";

import userIcon from "../../assets/user.svg";
import GroupChatIcon from "../../assets/group.svg";
import LogoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { HOME } from "../../utils/paths";

const Menu = () => {
  const { currentUser }: any = useContext(Context);
  const { name, image } = currentUser;

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleRef: any = useRef(null);

  const onCloseDropdown = (event: Event) => {
    if (
      toggleRef.current &&
      isOpened &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onCloseDropdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return (
    <header className="header">
      <Link to={HOME}>
        <h1>DevChallenge</h1>
      </Link>

      <div className="menu" ref={toggleRef}>
        <div
          className={isOpened ? "menu-trigger open-menu" : "menu-trigger"}
          onClick={() => setIsOpened(!isOpened)}
        >
          <img
            src={image ? image : userIcon}
            className="image"
            alt={`${name ? name : "Me"} avatar`}
          />

          <b className="name">{name ? name : "Me"}</b>
        </div>
        <ul className={isOpened ? "menu-list open-list" : "menu-list"}>
          <li className="list-item profile">
            <button>
              <img src={userIcon} alt="profile-icon" /> My Profile
            </button>
          </li>
          <li className="list-item group">
            <button>
              <img src={GroupChatIcon} alt="group-chat-icon" /> Group Chat
            </button>
          </li>
          <li className="list-item logout">
            <button onClick={logout}>
              <img src={LogoutIcon} alt="logout-icon" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Menu;
