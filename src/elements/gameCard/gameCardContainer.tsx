import { FC } from "react";
import "./gameCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps } from "../../types/types";
import GameCard from "./gameCard";
import { addGameToCartAction } from "../../components/redux/cart/cartActions";
import { ReducerState } from "../../components/redux/reducer";

const GameCardContainer: FC<ProductItemProps> = ({ title, description, category, logo, rating, price }) => {
  const dispatch = useDispatch();
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
  const addGame = (
    gameTitle: string,
    gameCategory: string,
    gamePrice: number,
    gameCheck: boolean,
    gameAmount: number
  ) => {
    if (gamesList.some((stateGame) => stateGame.title === gameTitle)) {
      alert("Game is already in the cart");
      return;
    }
    dispatch(
      addGameToCartAction({
        title: gameTitle,
        category: gameCategory,
        price: gamePrice,
        check: gameCheck,
        amount: gameAmount,
      })
    );
  };
  return (
    <GameCard
      title={title}
      description={description}
      category={category}
      logo={logo}
      rating={rating}
      price={price}
      action={addGame}
    />
  );
};

export default GameCardContainer;
