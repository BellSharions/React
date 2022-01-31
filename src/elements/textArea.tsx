import { TextAreaProps } from "@/types/types";
import { FC } from "react";
import styles from "styled-components";

const InputAreaContainer = styles.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const Input = styles.textarea`
  border: 1px solid white;
  box-sizing: border-box;
  background-color: inherit;
  color: white;
  margin-bottom: 0px;
`;
const InputAreaLabel = styles.label`
  margin: 0px;
  font-size: 1rem;
  color: white;
`;
const TextArea: FC<TextAreaProps> = ({ name, id, value, onChange }) => (
  <InputAreaContainer>
    <InputAreaLabel htmlFor={id}>{name}</InputAreaLabel>
    <Input name={name} id={id} value={value} onChange={onChange} autoComplete="off" />
  </InputAreaContainer>
);

export default TextArea;
