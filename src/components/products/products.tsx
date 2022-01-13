import { useParams } from "react-router-dom";
import { ProductParams } from "../../types/types";
import "./products.scss";
import ProductsComponent from "./productsComponent";

const Products: React.FC = () => {
  const { platform } = useParams<ProductParams>();
  return <ProductsComponent platform={platform} />;
};

export default Products;
