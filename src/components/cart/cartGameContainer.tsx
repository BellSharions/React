import { FC, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartGame.scss";
import { CartGameContainerProps } from "../../types/types";
import { ReducerState } from "../redux/reducer";
import CartGame from "./cartGame";
import { changeGameAmountAction, changeGameCheckAction } from "../redux/cart/cartActions";

const CartGameContainer: FC<CartGameContainerProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const role = useSelector((state: ReducerState) => state.reducer.role);
  const [checked, setChecked] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      const num = Math.floor(Number(e.target.value));
      setNumber(num);
      const amountGame = games.filter((game) => game.title === title);
      amountGame[0].amount = num;
      dispatch(changeGameAmountAction(amountGame));
      const postResponse = await fetch(`http://localhost:8080/api/cart/${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gamesList: games }),
      });
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    const checkedGame = games.filter((game) => game.title === title);
    checkedGame[0].check = !checked;
    dispatch(changeGameCheckAction(checkedGame));
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
      number={games.filter((game) => game.title === title)[0].amount}
      checked={checked}
      checkHandler={checkHandler}
    />
  );
};

export default memo(CartGameContainer);
