import { FC } from "react";
import TextArea from "./textArea";

export interface TextAreaContainerProps {
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const TextAreaContainer: FC<TextAreaContainerProps> = ({ name, id, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target?.value);
  };

  return <TextArea name={name} id={id} value={value} onChange={changeHandler} />;
};

export default TextAreaContainer;
