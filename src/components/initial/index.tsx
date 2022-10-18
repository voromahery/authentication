import React from "react";
import "./style.scss";

const UserInitial = ({ name, width = 72, height = 72 }: any) => {
  const splitName = name?.split(" ").map((name: string) => name[0]);
  const initial = splitName?.join("");
  return (
    <div
      className="avatar"
      style={{
        maxWidth: `${width}px`,
        height: `${height}px`,
        backgroundColor: "blue",
        color: "white",
      }}
    >
      {initial ? initial : "Me"}
    </div>
  );
};

export default UserInitial;
