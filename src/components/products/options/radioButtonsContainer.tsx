import { FC } from "react";
import { useDispatch } from "react-redux";
import { ageOptions, genreOptions } from "../../../constants";
import { filterByAgeAction, filterByGenreAction } from "../../../redux/actions/filterActions";
import RadioButtons from "./radioButtons";

export interface RadioButtonContainerProps {
  array: Array<string>;
  filter: string;
}

const RadioButtonsContainer: FC<RadioButtonContainerProps> = ({ array, filter }) => {
  const dispatch = useDispatch();

  const setSelect = (select: string) => {
    const matcher = new RegExp(`^${select}`, "g");

    if (ageOptions.filter((word) => word.match(matcher)).length === 1) dispatch(filterByAgeAction(select));
    if (genreOptions.filter((word) => word.match(matcher)).length === 1) dispatch(filterByGenreAction(select));
  };

  return <RadioButtons setSelect={setSelect} array={array} filter={filter} />;
};

export default RadioButtonsContainer;
