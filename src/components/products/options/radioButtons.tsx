import { FC } from "react";
import { RadioButtonProps } from "@/types/types";

const RadioButtons: FC<RadioButtonProps> = ({ setSelect, array, filter }) => (
  <div className="selector__container">
    {array.map((item) => (
      <div className="selector__input_container" key={item}>
        <input
          className="selector__input_radioButton"
          type="radio"
          id={item}
          value={item}
          onChange={(e) => {
            setSelect(e.target.value);
          }}
          checked={filter === item}
        />
        <label className="selector__label_container" htmlFor={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </label>
      </div>
    ))}
  </div>
);

export default RadioButtons;
