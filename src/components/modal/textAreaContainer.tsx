import { TextAreaContainerProps } from "@/types/types";
import { FC } from "react";
import TextArea from "./textArea";

const TextAreaContainer: FC<TextAreaContainerProps> = ({ name, id, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target?.value);
  };

  return <TextArea name={name} id={id} value={value} onChange={changeHandler} />;
};

export default TextAreaContainer;
