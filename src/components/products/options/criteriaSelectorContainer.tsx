import { FC } from "react";
import { useDispatch } from "react-redux";
import { filterBySelectionAction, filterBySelectionDirectionAction } from "../../../redux/actions/filterActions";
import CriteriaSelector from "./criteriaSelector";

export interface CriteriaContainerProps {
  sort: string;
  sortDir: string;
}

const CriteriaSelectorContainer: FC<CriteriaContainerProps> = ({ sort, sortDir }) => {
  const dispatch = useDispatch();

  const setCriteria = (value: string) => {
    dispatch(filterBySelectionAction(value));
  };
  const setType = (value: string) => {
    dispatch(filterBySelectionDirectionAction(value));
  };

  return <CriteriaSelector setCriteria={setCriteria} setType={setType} sort={sort} sortDir={sortDir} />;
};

export default CriteriaSelectorContainer;
