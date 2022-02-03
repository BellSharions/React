import { FC } from "react";
import "./inputtext.css";
import InputText from "./inputText";

export interface InputProps {
  name: string;
  id: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const InputTextContainer: FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return <InputText name={name} id={id} type={type} value={value} changeHandler={changeHandler} />;
};

export default InputTextContainer;
