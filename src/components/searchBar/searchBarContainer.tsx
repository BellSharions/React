import { useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import loaderHook from "@/hooks/loaderHook";
import { useDispatch, useSelector } from "react-redux";
import { ProductParams } from "../../types/types";
import SearchBar from "./searchBar";
import { changeSearchAction, fetchGamesAction } from "../redux/filter/filterActions";
import { ReducerState } from "../redux/reducer";

const SearchBarContainer: FC<ProductParams> = ({ platform, age, sort, sortDir, genre, search }) => {
  const searchResult = useSelector((state: ReducerState) => state.filter.searchResult);
  const [setLoading] = loaderHook(false);
  const dispatch = useDispatch();
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchAction(e.target.value));
  };
  const debouncedOnChange = debounce(changeSearch, 300);
  useEffect(() => {
    (() => {
      setLoading(true);
      setTimeout(() => {
        if (platform === "" || platform === ":platform" || platform === "home" || platform === undefined)
          dispatch(
            fetchGamesAction(
              `${new URLSearchParams({
                text: search,
                platform: "all games",
                age,
                sort,
                sortDir,
                genre,
              } as Record<string, string>)}`
            )
          );
        else
          dispatch(
            fetchGamesAction(
              `${new URLSearchParams({
                text: search,
                platform,
                age,
                sort,
                sortDir,
                genre,
              } as Record<string, string>)}`
            )
          );
        setLoading(false);
      }, 500);
    })();
  }, [platform, age, sort, sortDir, genre, search]);
  return <SearchBar list={searchResult} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBarContainer;
