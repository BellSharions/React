import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import loaderHook from "@/hooks/loaderHook";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps, ProductParams } from "../../types/types";
import { fetchGameQueryLink } from "../../constants/constants";
import SearchBar from "./searchBar";
import { changeSearchAction } from "../redux/filter/filterActions";
import { ReducerState } from "../redux/reducer";

const SearchBarContainer: FC<ProductParams> = ({ platform, age, sort, sortDir, genre }) => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const [isLoading, setLoading] = loaderHook(false);
  const [search] = useSelector((state: ReducerState) => [state.term]);
  const dispatch = useDispatch();
  // eslint-disable-next-line require-await
  const updateQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(async () => {
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
            await fetch(
              `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform, age, sort, sortDir, genre })}`
            )
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
      setLoading(false);
    }, 1000);
  };
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchAction(e.target.value));
  };

  const debouncedOnChange = debounce(changeSearch, 300);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setTimeout(async () => {
        if (platform === "" || platform === ":platform" || platform === "home" || platform === undefined)
          setList(
            await (
              await fetch(
                `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
                  text: search,
                  platform: "all games",
                  age,
                  sort,
                  sortDir,
                  genre,
                })}`
              )
            ).json()
          );
        else if (search === "")
          setList(
            await (
              await fetch(
                `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({ platform, age, sort, sortDir, genre })}`
              )
            ).json()
          );
        else
          setList(
            await (
              await fetch(
                `${`${fetchGameQueryLink}` + "?"}${new URLSearchParams({
                  text: search,
                  platform,
                  age,
                  sort,
                  sortDir,
                  genre,
                })}`
              )
            ).json()
          );
        setLoading(false);
      }, 1000);
    })();
  }, [platform, age, sort, sortDir, genre, search]);

  return <SearchBar list={list} isLoading={isLoading} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBarContainer;
