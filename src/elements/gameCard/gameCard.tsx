import { FC } from "react";
import Rating from "@material-ui/lab/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./gameCard.scss";
import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import { ProductItemProps } from "../../types/types";

const platformIcons = { PC: faWindows, XBOX: faXbox, PlayStation: faPlaystation };

const GameCard: FC<ProductItemProps> = ({ title, description, category, logo, rating, price, action }) => (
  <div className="gameCard__container">
    <div className="gameCard__inner">
      <div className="gameCard__front">
        <div className="gameCard__img-container">
          <div className="gamecard__platform-icons">
            {category.split(", ").map((platform, index) => (
              <FontAwesomeIcon key={index.toString()} icon={platformIcons[platform]} className="category__icon" />
            ))}
          </div>
          <img className="gameCard__img-container-image" src={logo} alt="" />
        </div>
        <div className="gameCard__content-container">
          <div className="gameCard__front-text-container">
            <div className="gameCard__front-text">{title}</div>
            <div className="gameCard__front-price">{price}$</div>
          </div>
          <Rating name="size-small" size="small" value={+rating} readOnly />
        </div>
      </div>
      <div className="gameCard__back" tabIndex={0} role="button">
        <div className="gameCard__back-description">{description}</div>
        <button
          type="button"
          className="gameCard__back-button"
          onClick={() => action(title, category, price, false, 1)}
        >
          Buy
        </button>
      </div>
    </div>
  </div>
);

export default GameCard;
