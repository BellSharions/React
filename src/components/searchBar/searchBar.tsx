import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductsOutput from "../products/output/productsOutput";
import { ProductItemProps } from "../../types/types";
import { fetchGameLink, fetchGameQueryLink } from "../../constants/constants";

const SearchBar: FC = () => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setList(await (await fetch(fetchGameLink)).json());
    })();
  }, []);

  const updateQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const val = await (await fetch(fetchGameQueryLink + e.target.value)).json();
    setList(val);
    setIsLoading(false);
  };

  const debouncedOnChange = debounce(updateQuery, 300);

  return (
    <>
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
    </>
  );
};

export default SearchBar;
