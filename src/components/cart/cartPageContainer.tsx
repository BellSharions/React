import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartPage.scss";
import { IncreaseTotalAmountAction, removeGameFromCartAction } from "../redux/cart/cartActions";
import { ReducerState } from "../redux/reducer";
import { showBuyModalAction } from "../redux/actions";
import CartPage from "./cartPage";

const CartPageContainer: FC = () => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const userBalance = useSelector((state: ReducerState) => state.cart.userBalance);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(removeGameFromCartAction());
  };

  useEffect(() => {
    const total = Number(
      Math.floor(games.map((game) => game.amount * game.price).reduce((sum, current) => sum + current, 0) * 100) / 100
    );
    setTotalAmount(total);
  }, [games]);

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
    />
  );
};

export default CartPageContainer;
