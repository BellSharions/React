import { FC } from "react";
import "./inputtext.css";
import { InputProps } from "../../types/types";

const InputText: FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return (
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
};

export default InputText;
