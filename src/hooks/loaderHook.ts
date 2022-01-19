import { ReducerState } from "@/components/redux/reducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function loaderHook(defaultVal: boolean) {
  const [isLoading] = useSelector((state: ReducerState) => [state.isLoading]);
  const [IsLoading, setIsOnline] = useState(defaultVal);
  function setLoading(val: boolean) {
    setIsOnline(val);
  }
  useEffect(() => {
    setIsOnline(isLoading);
  }, [isLoading]);

  return [IsLoading, setLoading];
}
export default loaderHook;
