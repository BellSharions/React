import { FC, useEffect, useState } from "react";
import "./gameCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { showEditGameModalAction } from "@/components/redux/actions";
import { ProductItemProps } from "../../types/types";
import GameCard from "./gameCard";
import { addGameToCartAction, changeGameAmountAction } from "../../components/redux/cart/cartActions";
import { ReducerState } from "../../components/redux/reducer";

const GameCardContainer: FC<ProductItemProps> = ({ title, description, category, logo, rating, price }) => {
  const dispatch = useDispatch();
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
  const role = useSelector((state: ReducerState) => state.reducer.role);
  const [visible, setVisible] = useState<boolean>(false);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const addGame = async (
    gameTitle: string,
    gameCategory: string,
    gamePrice: number,
    gameCheck: boolean,
    gameAmount: number
  ) => {
    if (gamesList.some((game) => game.title === gameTitle)) {
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
    const reqBody = gamesList.concat({
      title: gameTitle,
      category: gameCategory,
      price: gamePrice,
      check: gameCheck,
      amount: gameAmount,
    });
    console.log(reqBody);
    const postResponse = await fetch(`http://localhost:8080/api/cart/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gamesList: reqBody }),
    });
  };
  const editAction = () => {
    dispatch(showEditGameModalAction());
  };
  useEffect(() => {
    if (role === "admin") setVisible(true);
  }, [role]);
  return (
    <GameCard
      title={title}
      description={description}
      category={category}
      logo={logo}
      rating={rating}
      price={price}
      action={addGame}
      editAction={editAction}
      visible={visible}
    />
  );
};

export default GameCardContainer;
