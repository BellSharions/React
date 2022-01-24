import { CriteriaProps } from "@/types/types";
import { FC } from "react";
import "./criteriaSelector.scss";

const CriteriaSelector: FC<CriteriaProps> = ({ setCriteria, setType, sort, sortDir }) => (
  <div className="criteriaSelector__container">
    <label htmlFor="criteria" className="criteriaSelector__label">
      <p className="criteriaSelector__item_title">Criteria</p>
      <select
        className="criteriaSelector__selector"
        id="criteria"
        onChange={(e) => {
          setCriteria(e.target.value);
        }}
        value={sort}
      >
        <option value="rating">Rating</option>
        <option value="price">Price</option>
      </select>
    </label>
    <label htmlFor="type" className="criteriaSelector__label">
      <p className="criteriaSelector__item_title">Type</p>
      <select
        className="criteriaSelector__selector"
        id="type"
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={sortDir}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </label>
  </div>
);

export default CriteriaSelector;
