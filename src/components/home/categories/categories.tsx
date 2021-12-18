import { FC } from "react";
import { gameCategories } from "../../../constants/constants";
import Category from "./category";
import "./categories.scss";

const Categories: FC = () => (
  <div className="categories__container">
    <div className="categories__title-container">
      <h1 className="categories__title">Categories</h1>
    </div>
    <div className="categories__content-container">
      {gameCategories.map(
        ({ title, icon, path }): JSX.Element => (
          <Category key={title} title={title} icon={icon} path={path} />
        )
      )}
    </div>
  </div>
);

export default Categories;
