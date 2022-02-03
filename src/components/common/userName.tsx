import { FC, memo } from "react";
import "./username.scss";

export interface UserNameProps {
  userName: string | undefined;
}

const UserName: FC<UserNameProps> = ({ userName }) => (
  <div className="userName__container">
    <p className="userName__title">{userName}</p>
  </div>
);

export default memo(UserName);
