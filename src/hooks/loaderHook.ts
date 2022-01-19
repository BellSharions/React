import { useState } from "react";
import Preloader from "@/components/UI/preloader/preloader";

const useLoader: () => [any] = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? (
      <>
        <img src={imagePreloader} alt="preloader" className={preloader.loader} />
      </>
    ) : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
export default useLoader;
