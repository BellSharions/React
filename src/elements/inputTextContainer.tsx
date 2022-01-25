import { FC } from "react";
import "./inputtext.css";
import { InputProps } from "@/types/types";
import InputText from "./inputText";

const InputTextContainer: FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return <InputText name={name} id={id} type={type} value={value} changeHandler={changeHandler} />;
};

export default InputTextContainer;
