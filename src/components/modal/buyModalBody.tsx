import { FC } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameCart } from "@/types";
import BtnContainer from "../common/buttonContainer";
import "./buyModalBody.scss";

export interface BuyModalProps {
  userName: string;
  cartGames: GameCart[];
  amount: number;
  closeHandler: () => void;
  confirmHandler: () => void;
}

const BuyModalBody: FC<BuyModalProps> = ({ userName, cartGames, amount, closeHandler, confirmHandler }) => (
  <div className="buy__modal_container" role="note">
    <button className="buy__modal_close-btn" type="button" onClick={closeHandler}>
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
      <div className="buyModal_confirm-btn">
        <BtnContainer action={confirmHandler} childrenProps={{ label: "Confirm" }} />
      </div>
    </div>
  </div>
);

export default BuyModalBody;
