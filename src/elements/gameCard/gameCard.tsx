import { FC } from "react";
import Rating from "@material-ui/lab/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./gameCard.scss";
import { faPlaystation, faWindows, faXbox, IconDefinition } from "@fortawesome/free-brands-svg-icons";

export interface ProductItemProps {
  id?: number;
  age?: number;
  title: string;
  description?: string;
  developer?: string;
  date?: string;
  genre?: string;
  category: string;
  logo?: string;
  rating: string;
  price: number;
  action: (gameTitle: string, gameCategory: string, gamePrice: number, gameCheck: boolean, gameAmount: number) => void;
  editAction?: () => void;
  visible?: boolean;
}

const platformIcons = [faWindows, faXbox, faPlaystation];

const GameCard: FC<ProductItemProps> = ({
  title,
  description,
  category,
  logo,
  rating,
  price,
  action,
  editAction,
  visible,
}) => (
  <div className="gameCard__container">
    <div className="gameCard__inner">
      <div className="gameCard__front">
        <div className="gameCard__img-container">
          <div className="gamecard__platform-icons">
            {category.split(", ").map((value, index) => (
              <FontAwesomeIcon key={value} icon={platformIcons[index] as IconDefinition} className="category__icon" />
            ))}
          </div>
          <img className="gameCard__img-container-image" src={logo} alt="Loading gamecard" />
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
        <div className="gameCard__back-buttons">
          {visible ? (
            <button type="button" className="gameCard__back-button" onClick={editAction}>
              Edit
            </button>
          ) : null}
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
  </div>
);

export default GameCard;
