import { FC } from "react";
import "./gameCard.scss";
import { ProductItemProps } from "../../types/types";

const GameCard: FC<ProductItemProps> = ({ title, description, category, logo }) => (
  <div className="gameCard__container">
    <div className="gameCard__inner">
      <div className="gameCard__front">
        <div className="gameCard__img-container">
          <img className="gameCard__img-container-image" src={logo} alt="" />
        </div>
        <div className="gameCard__content-container">
          <p>{title}</p>
          <p>{category}</p>
        </div>
      </div>
      <div className="gameCard__back">
        <div className="gameCard__back-description">{description}</div>
        <input className="gameCard__back-button" type="button" value="Buy" />
      </div>
    </div>
  </div>
);

export default GameCard;
