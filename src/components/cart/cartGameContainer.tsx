import { FC, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartGame.scss";
import { CartGameContainerProps } from "../../types/types";
import { ReducerState } from "../redux/reducer";
import CartGame from "./cartGame";
import { changeGameAmountAction, changeGameCheckAction } from "../redux/cart/cartActions";

const CartGameContainer: FC<CartGameContainerProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const [checked, setChecked] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      const num = Math.floor(Number(e.target.value));
      setNumber(num);
      const amountGame = games.filter((game) => game.title === title);
      amountGame[0].amount = num;
      dispatch(changeGameAmountAction(amountGame));
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    const checkedGame = games.filter((game) => game.title === title);
    checkedGame[0].check = !checked;
    dispatch(changeGameCheckAction(checkedGame));
  };

  const totalPerGame = number * price;

  const today = new Date();

  return (
    <CartGame
      title={title}
      platforms={platforms}
      today={today}
      totalPerGameCut={totalPerGame}
      amountHandler={amountHandler}
      number={number}
      checked={checked}
      checkHandler={checkHandler}
    />
  );
};

export default memo(CartGameContainer);
