import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductsOutput from "../products/output/productsOutput";
import { ProductItemProps, ProductParams } from "../../types/types";
import { fetchGameLink, fetchGameQueryLink } from "../../constants/constants";

const SearchBar: FC<ProductParams> = (platform) => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      console.log(platform.platform);
      
      if (platform.platform === "" || platform.platform === ":platform") setList(await (await fetch(`${fetchGameLink}`)).json());
      else
        setList(
          await (
            await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform: platform.platform })}`)
          ).json()
        );
    })();
  }, [platform]);

  const updateQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    
      console.log(platform.platform);
    setIsLoading(true);
    if (platform.platform === "")
      setList(
        await (await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ text: e.target.value })}`)).json()
      );
    else if (e.target.value === "")
      setList(
        await (
          await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform: platform.platform })}`)
        ).json()
      );
    else
      setList(
        await (
          await fetch(
            `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
              text: e.target.value,
              platform: platform.platform,
            })}`
          )
        ).json()
      );
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
