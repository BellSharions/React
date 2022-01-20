import { FC } from "react";
import GameCard from "../../gameCard/gameCard";
import { ProductItemProps } from "../../../types/types";
import "./productsOutput.scss";

interface Props {
  productList: Array<ProductItemProps>;
}

const ProductsOutput: FC<Props> = ({ productList }) => (
  <div className="productsOutput__results-container">
    {productList.length === 0 ? (
      <p>No games have been found</p>
    ) : (
      productList.map(({ id, title, description, developer, date, category, logo, rating, price }) => (
        <GameCard
          key={id}
          title={title}
          description={description}
          developer={developer}
          date={date}
          category={category}
          logo={logo}
          rating={rating}
          price={price}
        />
      ))
    )}
  </div>
);

export default ProductsOutput;
