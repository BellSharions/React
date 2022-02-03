import { FC } from "react";
import "./cartGame.scss";

export interface CartGameProps {
  title: string;
  platforms: string[];
  today: Date;
  totalPerGameCut: number;
  amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  number: number;
  checked: boolean;
  checkHandler: () => void;
}

const CartGame: FC<CartGameProps> = ({
  title,
  platforms,
  today,
  totalPerGameCut,
  amountHandler,
  number,
  checked,
  checkHandler,
}) => (
  <div className="cartGame__container">
    <div className="cartGame__data_name cartGame__data_container">
      <p className="cartGame__data_paragraphName">{title}</p>
    </div>
    <div className="cartGame__data_platform cartGame__data_container">
      <select className="cartGame__platform_selector">
        {platforms.map((platform) => (
          <option value={platform} key={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
    <div className="cartGame__data_date cartGame__data_container">
      <p className="cartGame__data_paragraphDate">
        {`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}
      </p>
    </div>
    <div className="cartGame__data_amount cartGame__data_container">
      <input type="number" value={number} onChange={(e) => amountHandler(e)} className="cartGame__amount_input" />
    </div>
    <div className="cartGame__data_price cartGame__data_container">
      <p className="cartGame__data_paragraphPrice">{totalPerGameCut}</p>
    </div>
    <div className="cartGame__data_check cartGame__data_container">
      <input type="checkbox" checked={checked} onChange={checkHandler} />
    </div>
  </div>
);

export default CartGame;
