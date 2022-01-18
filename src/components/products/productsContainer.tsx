import { useParams } from "react-router-dom";
import { ProductParams } from "../../types/types";
import "./products.scss";
import Products from "./products";

const ProductsContainer: React.FC = () => {
  const { platform } = useParams<ProductParams>();
  return <Products platform={platform} />;
};

export default ProductsContainer;
