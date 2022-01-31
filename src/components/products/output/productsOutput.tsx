import { FC } from "react";
import GameCard from "../../../elements/gameCard/gameCardContainer";
import { ProductItemProps } from "../../../types/types";
import "./productsOutput.scss";

interface Props {
  productList: Array<ProductItemProps>;
}

const ProductsOutput: FC<Props> = ({ productList }) => (
  <div className="productsOutput__results-container">
    {!productList || productList.length === 0 ? (
      <p>Loading</p>
    ) : (
      productList.map(({ id, title, description, developer, date, category, logo, rating, price, age, genres }) => (
        <GameCard
          key={id}
          id={id}
          title={title}
          age={age}
          genre={genres}
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
