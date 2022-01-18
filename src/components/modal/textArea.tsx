import { TextAreaProps } from "@/types/types";
import { FC } from "react";
import "./textArea.scss";

const TextArea: FC<TextAreaProps> = ({ name, id, value, onChange }) => (
  <div className="profileTextArea__container">
    <label htmlFor={id} className="profileTextArea__label">
      {name}
    </label>
    <textarea
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className="profileTextArea__textarea"
      autoComplete="off"
    />
  </div>
);

export default TextArea;
