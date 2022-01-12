import { useParams } from "react-router-dom";
import { ProductParams } from "../../types/types";
import SearchBar from "../searchBar/searchBar";
import "./products.scss";

const Products: React.FC = () => {
  const { platform } = useParams<ProductParams>();
  return (
    <div className="productsPage__container">
      <SearchBar platform={platform} />
    </div>
  );
};

export default Products;
