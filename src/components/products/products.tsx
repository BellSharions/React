import { useState } from "react";

const Products: React.FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  if (count === 1) {
    throw new Error("Oops! there is an Error");
  }
  return (
    <>
      <p>Products</p>
      <button type="button" onClick={handleClick}>
        Click this button to cause an error
      </button>
    </>
  );
};

export default Products;
