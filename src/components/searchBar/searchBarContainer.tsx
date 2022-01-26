import { useState, useEffect, FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import "./searchBar.scss";
import loaderHook from "@/hooks/loaderHook";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps, ProductParams } from "../../types/types";
import SearchBar from "./searchBar";
import { changeSearchAction, fetchGamesAction } from "../redux/filter/filterActions";
import { ReducerState } from "../redux/reducer";

const SearchBarContainer: FC<ProductParams> = ({ platform, age, sort, sortDir, genre, search }) => {
  const [list, setList] = useState<Array<ProductItemProps>>([]);
  const fetchFlag = useSelector((state: ReducerState) => state.reducer.fetch);
  const searchResult = useSelector((state: ReducerState) => state.reducer.searchResult);
  const [isLoading, setLoading] = loaderHook(false);
  const dispatch = useDispatch();
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchAction(e.target.value));
  };
  const debouncedOnChange = debounce(changeSearch, 300);
  useEffect(() => {
    (() => {
      setLoading(true);
      setTimeout(async () => {
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
              })}`
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
              })}`
            )
          );
        setLoading(false);
      }, 500);

      console.log(list);
    })();
  }, [platform, age, sort, sortDir, genre, search]);
  return <SearchBar list={searchResult} debouncedOnChange={debouncedOnChange} />;
};

export default SearchBarContainer;
