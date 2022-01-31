import { changeLoadingAction } from "@/components/redux/actions";
import { ReducerState } from "@/components/redux/reducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function loaderHook(defaultVal: boolean) {
  const [isLoading] = useSelector((state: ReducerState) => [state.reducer.isLoading]);
  const [IsLoading, setIsOnline] = useState(defaultVal);
  const dispatch = useDispatch();
  function setLoading(val: boolean) {
    setIsOnline(val);
  }
  useEffect(() => {
    dispatch(changeLoadingAction(IsLoading));
  }, [IsLoading]);

  return [setLoading];
}
export default loaderHook;
