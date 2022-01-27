import { FC, memo } from "react";
import { Link } from "react-router-dom";
import "./category.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryProp } from "../../../types/types";

const Category: FC<CategoryProp> = ({ icon, title, path }) => (
  <Link to={path} key={title} className="category__container">
    <div className="category__frame">
      <div className="category__icon-container">
        <FontAwesomeIcon icon={icon} className="category__icon" />
      </div>
      <div className="category__title-container">
        <p className="category__title">{title}</p>
      </div>
    </div>
  </Link>
);

export default memo(Category);
