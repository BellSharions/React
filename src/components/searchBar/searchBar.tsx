import { FC } from "react";
import "./searchBar.scss";
import { SearchBarComponentProps } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductsOutput from "../products/output/productsOutput";

const SearchBar: FC<SearchBarComponentProps> = ({ list, isLoading, debouncedOnChange }) => (
  <>
    <div className="searchBar__outercontainer">
      <div className="searchBar__container">
        <input type="text" placeholder="Search" className="searchBar" onChange={debouncedOnChange} />
        <div className="searchBar__icon-container">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="searchBar__loading-icon" />
          ) : (
            <FontAwesomeIcon icon={faSearch} className="searchBar__search-icon" />
          )}
        </div>
      </div>
      <ProductsOutput productList={list} />
    </div>
  </>
);

export default SearchBar;
