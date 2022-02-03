import { ChangeEvent, FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartGame.scss";
import { CallType, userCartUrl } from "@/constants";
import apiCall from "@/apiCall";
import { ReducerState } from "../redux/reducer";
import CartGame from "./cartGame";
import { changeGameAmountAction, changeGameCheckAction } from "../redux/cart/cartActions";

export interface CartGameContainerProps {
  title: string;
  category: string;
  price: number;
}

const CartGameContainer: FC<CartGameContainerProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const foundGame = games.filter((game) => game.title === title);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (Number(value) > 0) {
      const num = Math.floor(Number(value));
      foundGame[0].amount = num;
      dispatch(changeGameAmountAction(foundGame));
      await apiCall(`${userCartUrl}${userName}`, CallType.POST, { gamesList: games });
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    foundGame[0].check = !checked;
    dispatch(changeGameCheckAction(foundGame));
  };
  const totalPerGame = games.filter((game) => game.title === title)[0].amount * price;

  const today = new Date();

  return (
    <CartGame
      title={title}
      platforms={platforms}
      today={today}
      totalPerGameCut={totalPerGame}
      amountHandler={amountHandler}
      number={foundGame[0].amount}
      checked={foundGame[0].check}
      checkHandler={checkHandler}
    />
  );
};

export default CartGameContainer;
