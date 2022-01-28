import { FC } from "react";
import { BtnProps } from "@/types/types";
import "./button.scss";

const Button: FC<BtnProps> = ({ action, text }) => (
  <div className="button__container">
    <button type="button" className="btn" onClick={action}>
      <p className="button__title">{text.label}</p>
      <i className={text.icon} />
    </button>
  </div>
);

export default Button;
