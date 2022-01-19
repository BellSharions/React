import { useState } from "react";

const useLoader = () => {
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
