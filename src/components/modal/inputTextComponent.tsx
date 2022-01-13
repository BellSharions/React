import { FC } from "react";
import "./inputtext.css";
import { InputComponentProps } from "../../types/types";

const InputTextComponent: FC<InputComponentProps> = ({ name, id, type, value, changeHandler }) => (
  <div className="inputText__container">
    <label htmlFor={id} className="inputText__label">
      {name}
    </label>
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={changeHandler}
      className="inputText__input"
      autoComplete="off"
    />
  </div>
);

export default InputTextComponent;
