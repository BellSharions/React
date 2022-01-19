import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import { ProductItemProps, ProductParams } from "../../types/types";
import { fetchGameLink, fetchGameQueryLink } from "../../constants/constants";
import SearchBar from "./searchBar";

const SearchBarContainer: FC<ProductParams> = ({ platform, age, sort, sortDir, genre }) => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const updateQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (platform === "" || platform === undefined)
      setList(
        await (
          await fetch(
            `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
              platform: "all games",
              text: e.target.value,
              age,
              sort,
              sortDir,
              genre,
            })}`
          )
        ).json()
      );
    else if (e.target.value === "")
      setList(
        await (
          await fetch(`${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform, age, sort, sortDir, genre })}`)
        ).json()
      );
    else
      setList(
        await (
          await fetch(
            `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
              text: e.target.value,
              platform,
              age,
              sort,
              sortDir,
              genre,
            })}`
          )
        ).json()
      );
    setIsLoading(false);
  };

  const debouncedOnChange = debounce(updateQuery, 300);
  useEffect(() => {
    (async () => {
      if (platform === "" || platform === ":platform" || platform === "home" || platform === undefined)
        setList(await (await fetch(`${fetchGameLink}`)).json());
      else
        setList(
          await (
            await fetch(
              `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform, age, sort, sortDir, genre })}`
            )
          ).json()
        );
    })();
  }, [platform, age, sort, sortDir, genre]);

  return <SearchBar list={list} isLoading={isLoading} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBarContainer;
