import { FC } from "react";
import GameCard from "../../../elements/gameCard/gameCardContainer";
import { Game } from "../../../types";
import "./productsOutput.scss";

interface Props {
  productList: Array<Game>;
}

const ProductsOutput: FC<Props> = ({ productList }) => (
  <div className="productsOutput__results-container">
    {!productList || productList.length === 0 ? (
      <p>Loading</p>
    ) : (
      productList.map(({ id, title, description, date, category, logo, rating, price, age, genre }) => (
        <GameCard
          key={id}
          id={id}
          title={title}
          age={age}
          genre={genre}
          description={description}
          date={date}
          category={category}
          logo={logo}
          rating={rating.toString()}
          price={price}
        />
      ))
    )}
  </div>
);

export default ProductsOutput;
