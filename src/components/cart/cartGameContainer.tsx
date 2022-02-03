import { ChangeEvent, FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartGame.scss";
import { CallType, userCartUrl } from "@/constants";
import apiCall from "@/apiCall";
import { ReducerState } from "@/redux/store/store";
import CartGame from "./cartGame";
import { changeGameAmountAction, changeGameCheckAction } from "../../redux/actions/cartActions";

export interface CartGameContainerProps {
  title: string;
  category: string;
  price: number;
}

interface IAmount {
  title: string;
  amount: number;
}

interface ICheck {
  title: string;
  check: boolean;
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

      dispatch(changeGameAmountAction({ title: foundGame[0].title, amount: num } as IAmount));
      await apiCall(`${userCartUrl}${userName}`, CallType.POST, { gamesList: games });
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    dispatch(changeGameCheckAction({ title: foundGame[0].title, check: !foundGame[0].check } as ICheck));
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
