import { FC } from "react";
import { ProductParams } from "../../types/types";
import SearchBar from "../searchBar/searchBar";
import "./products.scss";

const ProductsComponent: FC<ProductParams> = ({ platform }) => (
  <div className="productsPage__container">
    <SearchBar platform={platform} />
  </div>
);

export default ProductsComponent;
