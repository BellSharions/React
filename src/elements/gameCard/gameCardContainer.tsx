import { FC } from "react";
import "./gameCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps } from "../../types/types";
import GameCard from "./gameCard";
import { addGameToCartAction, changeGameAmountAction } from "../../components/redux/cart/cartActions";
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
      const amountGame = gamesList.filter((game) => game.title === title);
      amountGame[0].amount += 1;
      dispatch(changeGameAmountAction(amountGame));
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
