import { ChangeEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DebouncedFunc } from "lodash";
import { Game } from "@/types";
import ProductsOutput from "../products/output/productsOutput";

export interface SearchBarComponentProps {
  list: Game[];
  debouncedOnChange: DebouncedFunc<(e: ChangeEvent<HTMLInputElement>) => Promise<void>>;
}

const SearchBar: FC<SearchBarComponentProps> = ({ list, debouncedOnChange }) => (
  <>
    <div className="searchBar__outercontainer">
      <div className="searchBar__container">
        <input type="text" placeholder="Search" className="searchBar" onChange={debouncedOnChange} />
        <div className="searchBar__icon-container">
          <FontAwesomeIcon icon={faSearch} className="searchBar__search-icon" />
        </div>
      </div>
      <ProductsOutput productList={list} />
    </div>
  </>
);

export default SearchBar;
