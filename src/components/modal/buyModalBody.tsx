import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModalAction } from "../redux/actions";
import { buyGamesAction } from "../redux/cart/cartActions";
import { ReducerState } from "../redux/reducer";
import "./buyModalBody.scss";

const BuyModalBody: FC = () => {
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const cartGames = useSelector((state: ReducerState) => state.cart.gamesList);
  const amount = useSelector((state: ReducerState) => state.cart.totalPurchase);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModalAction());
  };

  const confirmHandler = () => {
    dispatch(buyGamesAction(amount));
    dispatch(closeModalAction());
  };

  return (
    <div className="buy__modal_container" role="note">
      <button className="buy__modal_close-btn" type="button" onClick={() => closeHandler()}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="buy__modal_content-container">
        <div className="buy__modal_contentParagraphs">
          <p className="buy__modal_contentParagraph-user">
            Dear {userName}, are you sure you want to buy following games for amount {amount}$
          </p>
          {cartGames.map(({ title }) => (
            <p className="buy__modal_contentParagraph" key={title}>
              - {title}
            </p>
          ))}
        </div>
        <button className="changePass__modal_close-btn" type="button" onClick={() => confirmHandler()}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BuyModalBody;
