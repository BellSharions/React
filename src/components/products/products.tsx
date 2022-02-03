import { FC } from "react";
import { ageOptions, genreOptions } from "../../constants";
import { ProductParams } from "../../types";
import SearchBar from "../searchBar/searchBarContainer";
import CriteriaSelector from "./options/criteriaSelectorContainer";
import RadioButtons from "./options/radioButtonsContainer";
import "./products.scss";

const Products: FC<ProductParams> = ({ platform, sort, age, genre, sortDir, search }) => (
  <div className="productsPage__container">
    <section className="productsPage__leftContent_container">
      <form className="productsPage__sortTable">
        <div className="productsPage__sortTable_platform productsPage__sortTable_item">
          <h1 className="productsPage__sortTable_platformTitle sortTable_titleItem">{platform}</h1>
        </div>
        <div className="productsPage__sortTable_criteria productsPage__sortTable_item">
          <div className="productsPage__sortTable_title">
            <p className="productsPage__sortTable_criteriaTitle sortTable_titleItem">Sort</p>
          </div>
          <div className="productsPage__sortTable_criteriaSelector sortTable_contentItem">
            <CriteriaSelector sort={sort} sortDir={sortDir} />
          </div>
        </div>
        <div className="productsPage_sortTable_genre productsPage__sortTable_item">
          <div className="productsPage__sortTable_title">
            <p className="productsPage__sortTable_genreTitle sortTable_titleItem">Genres</p>
          </div>
          <div className="productsPage__sortTable_genreSelector sortTable_contentItem">
            <RadioButtons array={genreOptions} filter={genre} />
          </div>
        </div>
        <div className="productsPage_sortTable_age productsPage__sortTable_item">
          <div className="productsPage__sortTable_title">
            <p className="productsPage__sortTable_genreTitle sortTable_titleItem">Age</p>
          </div>
          <div className="productsPage__sortTable_ageSelector sortTable_contentItem">
            <RadioButtons array={ageOptions} filter={age} />
          </div>
        </div>
      </form>
    </section>
    <SearchBar platform={platform} sort={sort} age={age} genre={genre} sortDir={sortDir} search={search} />
  </div>
);

export default Products;
