import { FC, memo, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartGame.scss";
import { CartGameContainerProps } from "../../types/types";
import { ReducerState } from "../redux/reducer";
import CartGame from "./cartGame";
import { changeGameAmountAction, changeGameCheckAction } from "../redux/cart/cartActions";

const CartGameContainer: FC<CartGameContainerProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const foundGame = useMemo(() => games.filter((game) => game.title === title), [games]);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      const num = Math.floor(Number(e.target.value));
      foundGame[0].amount = num;
      dispatch(changeGameAmountAction(foundGame));
      await fetch(`http://localhost:8080/api/user/cart/${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gamesList: games }),
      });
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    foundGame[0].check = !checked;
    dispatch(changeGameCheckAction(foundGame));
  };
  const totalPerGame = useMemo(() => games.filter((game) => game.title === title)[0].amount * price, [games]);

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

export default memo(CartGameContainer);
