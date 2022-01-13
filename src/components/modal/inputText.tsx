import { FC } from "react";
import "./inputtext.css";
import { InputProps } from "../../types/types";
import InputTextComponent from "./inputTextComponent";

const InputText: FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return <InputTextComponent name={name} id={id} type={type} value={value} changeHandler={changeHandler} />;
};

export default InputText;
