import { FC } from "react";
import { useDispatch } from "react-redux";
import { filterByAgeAction, filterByGenreAction } from "@/components/redux/filter/filterActions";
import { ageArr, genreArr } from "@/constants/constants";
import { RadioButtonContainerProps } from "@/types/types";
import RadioButtons from "./radioButtons";

const RadioButtonsContainer: FC<RadioButtonContainerProps> = ({ array, filter }) => {
  const dispatch = useDispatch();

  const setSelect = (select: string) => {
    const matcher = new RegExp(`^${select}`, "g");

    if (ageArr.filter((word) => word.match(matcher)).length === 1) dispatch(filterByAgeAction(select));
    if (genreArr.filter((word) => word.match(matcher)).length === 1) dispatch(filterByGenreAction(select));
  };

  return <RadioButtons setSelect={setSelect} array={array} filter={filter} />;
};

export default RadioButtonsContainer;
