import { fetchGameLink } from "@/constants/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductItemProps, ProductParams } from "../../types/types";
import ProductsOutput from "./output/productsOutput";
import "./products.scss";

const Products: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Array<ProductItemProps>>([]);

  const { platform } = useParams<ProductParams>();

  useEffect(() => {
    (async () => {
      const fetchJson: Array<ProductItemProps> = await (await fetch(fetchGameLink)).json();
      const categoryFiltered = fetchJson.filter(({ category }) => category.includes(platform));
      setCategoryList(categoryFiltered);
    })();
  }, [platform]);

  return (
    <div className="productsPage__container">
      <p>Here are listed products on this category:</p>
      <ProductsOutput productList={categoryList} />
    </div>
  );
};

export default Products;
