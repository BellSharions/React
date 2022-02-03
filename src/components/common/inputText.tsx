import { InputComponentProps } from "@/types";
import { ChangeEventHandler, FC } from "react";
import styles from "styled-components";

const InputContainer = styles.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Input = styles.input`
  border: 1px solid white;
  box-sizing: border-box;
  background-color: inherit;
  height: 1.5rem;
  width: 60%;
  color: white;
`;
const InputLabel = styles.label`
  font-size: 1.5rem;
  color: white;
`;

export interface InputComponentProps {
  name: string;
  id: string;
  type: string;
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
}

const InputText: FC<InputComponentProps> = ({ name, id, type, value, changeHandler }) => (
  <InputContainer>
    <InputLabel htmlFor={id}>{name}</InputLabel>
    <Input name={name} id={id} type={type} value={value} onChange={changeHandler} autoComplete="off" />
  </InputContainer>
);

export default InputText;
