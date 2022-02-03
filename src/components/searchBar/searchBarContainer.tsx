import { useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import loaderHook from "@/hooks/loaderHook";
import { useDispatch, useSelector } from "react-redux";
import { debounceDelay, RoutesMap } from "@/constants";
import { ProductParams } from "../../types";
import SearchBar from "./searchBar";
import { changeSearchAction, fetchGamesAction } from "../redux/filter/filterActions";
import { ReducerState } from "../redux/reducer";

const SearchBarContainer: FC<ProductParams> = ({ platform, age, sort, sortDir, genre, search }) => {
  const dispatch = useDispatch();
  const [setLoading] = loaderHook(false);

  const searchResult = useSelector((state: ReducerState) => state.filter.searchResult);

  const changeSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchAction(value));
  };

  const searchParams = new URLSearchParams({
    text: search,
    age,
    sort,
    sortDir,
    genre,
  } as Record<string, string>);

  const debouncedOnChange = debounce(changeSearch, debounceDelay);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (platform === RoutesMap.HOME || !platform) {
        searchParams.append("platform", "all games");
        dispatch(fetchGamesAction(`${searchParams}`));
      } else {
        searchParams.append("platform", platform);
        dispatch(fetchGamesAction(`${searchParams}`));
      }
      setLoading(false);
    }, 500);
  }, [platform, age, sort, sortDir, genre, search]);

  return <SearchBar list={searchResult} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBarContainer;
