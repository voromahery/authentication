import { useEffect, useState, useRef } from "react";
import "./index.scss";
import { logout } from "../../firebase";

import ProfileIcon from "../../assets/user.svg";
import GroupChatIcon from "../../assets/group.svg";
import LogoutIcon from "../../assets/logout.svg";

import { Props } from "../../App";
import UserInitial from "../initial/index";

const Menu = ({ currentUser }: Props) => {
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
  }, [isOpened]);

  return (
    <header className="header">
      <h1>DevChallenge</h1>

      <div className="menu" ref={toggleRef}>
        <div
          className={isOpened ? "menu-trigger open-menu" : "menu-trigger"}
          onClick={() => setIsOpened(!isOpened)}
        >
          {image ? (
            <img
              src={image}
              className="image"
              alt={`${name ? name : "Me"} avatar`}
            />
          ) : (
            <UserInitial name={name} width={32} height={32} />
          )}
          <b className="name">{name ? name : "Me"}</b>
        </div>
        <ul className={isOpened ? "menu-list open-list" : "menu-list"}>
          <li className="list-item profile">
            <button>
              <img src={ProfileIcon} alt="profile-icon" /> My Profile
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
