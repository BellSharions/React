import { CartPageProps } from "@/types/types";
import { FC } from "react";
import CartGame from "./cartGameContainer";
import "./cartPage.scss";

const CartPage: FC<CartPageProps> = ({ games, clickHandler, totalAmount, userBalance, buyFunc }) => (
  <div className="cartPage__container">
    <section className="cartPage__title_section">
      <div className="cartPage__title_container">
        <p className="cartPage__title">Cart page</p>
      </div>
    </section>
    <section className="cartPage__content_section">
      <div className="cartPage__content_titlesContainer">
        <div className="cartPage__content_titleContainer cartPage__content_containerName">
          <p className="cartPage__content_title">Name</p>
        </div>
        <div className="cartPage__content_titleContainer  cartPage__content_containerPlatform">
          <p className="cartPage__content_title">Platform</p>
        </div>
        <div className="cartPage__content_titleContainer  cartPage__content_containerDate">
          <p className="cartPage__content_title">Order date</p>
        </div>
        <div className="cartPage__content_titleContainer  cartPage__content_containerAmount">
          <p className="cartPage__content_title">Amount</p>
        </div>
        <div className="cartPage__content_titleContainer  cartPage__content_containerPrice">
          <p className="cartPage__content_title">Price($)</p>
        </div>
        <div className="cartPage__content_titleContainer  cartPage__content_containerEmpty" />
      </div>
      <div className="cartPage__content_gamesContainer">
        <div className="cartPage__content_gamesListed">
          {games.map(({ title, category, price }) => (
            <CartGame key={title} title={title} category={category} price={price} />
          ))}
        </div>
        {games.length > 0 ? (
          <div className="cartPage__formRemove_container">
            <button className="cartPage__formRemove_btn" type="button" onClick={() => clickHandler()}>
              Remove
            </button>
          </div>
        ) : null}
        <div className="cartPage__formSubmit_container">
          <div className="cartPage__formSubmit_gamesCost">
            {games.length > 0 ? <p className="cartPage__gamesCost">Games cost {totalAmount} $</p> : null}
          </div>
          <div className="cartPage__formSubmit_yourBalance">
            <p className="cartPage__yourBalance">Your balance: {Math.floor(userBalance * 100) / 100} $</p>
          </div>
          <div className="cartPage__formSubmit_submitBtn">
            {games.length > 0 ? (
              <button className="cartPage__formSubmit_btn" type="button" onClick={() => buyFunc()}>
                Buy
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default CartPage;
