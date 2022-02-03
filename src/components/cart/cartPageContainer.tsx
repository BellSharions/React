import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartPage.scss";
import apiCall from "@/apiCall";
import { CallType, userCartUrl } from "@/constants";
import { IncreaseTotalAmountAction, removeGameFromCartAction } from "../redux/cart/cartActions";
import { ReducerState } from "../redux/reducer";
import { showBuyModalAction } from "../redux/actions";
import CartPage from "./cartPage";

const CartPageContainer: FC = () => {
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const userBalance = useSelector((state: ReducerState) => state.cart.userBalance);
  const dispatch = useDispatch();
  const clickHandler = async () => {
    dispatch(removeGameFromCartAction());
    await apiCall(`${userCartUrl}${userName}`, CallType.POST, {
      gamesList: games.filter((game) => game.check === false),
    });
  };
  const totalAmount = Number(games.map((game) => game.amount * game.price).reduce((sum, current) => sum + current, 0));
  const valid = games.map((game) => game.check).some((check) => check === true);

  const buyFunc = () => {
    if (totalAmount <= userBalance) {
      dispatch(IncreaseTotalAmountAction(totalAmount));
      dispatch(showBuyModalAction());
    } else {
      alert("You do not have enough money. Please remove something from cart.");
    }
  };

  return (
    <CartPage
      games={games}
      clickHandler={clickHandler}
      totalAmount={totalAmount}
      userBalance={userBalance}
      buyFunc={buyFunc}
      valid={valid}
    />
  );
};

export default CartPageContainer;
