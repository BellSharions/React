import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import { useLocation } from "react-router-dom";
import { ProductItemProps, ProductParams } from "../../types/types";
import { fetchGameLink, fetchGameQueryLink } from "../../constants/constants";
import SearchBarComponent from "./SearchBarComponent";

const SearchBar: FC<ProductParams> = (platform) => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const plat = useLocation();
  const search = plat.pathname.split("/")[2];
  useEffect(() => {
    (async () => {
      console.log(search);
      if (search === "" || search === ":platform" || search === "home" || search === undefined)
        setList(await (await fetch(`${fetchGameLink}`)).json());
      else
        setList(
          await (await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform: search })}`)).json()
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
        await (await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform: search })}`)).json()
      );
    else
      setList(
        await (
          await fetch(
            `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
              text: e.target.value,
              platform: search,
            })}`
          )
        ).json()
      );
    setIsLoading(false);
  };

  const debouncedOnChange = debounce(updateQuery, 300);

  return <SearchBarComponent list={list} isLoading={isLoading} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBar;
