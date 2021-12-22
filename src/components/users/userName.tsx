import { FC } from "react";
import "./username.scss";
import { UserNameProps } from "../../types/types";

const UserName: FC<UserNameProps> = ({ userName }) => (
  <div className="userName__container">
    <p className="userName__title">{userName}</p>
  </div>
);

export default UserName;
