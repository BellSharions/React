import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "@/apiCall";
import { CallType, ModalTypes, Roles, userCartUrl } from "@/constants";
import { ReducerState } from "@/redux/store/store";
import { showModalAction } from "@/redux/actions/modalActions";
import { addGameToEditAction } from "../../../redux/actions/adminActions";
import { GameToEdit } from "../../../types";
import GameCard from "./gameCard";
import { addGameToCartAction, changeGameAmountAction } from "../../../redux/actions/cartActions";

export interface GameItemProps {
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
  action?: (gameTitle: string, gameCategory: string, gamePrice: number, gameCheck: boolean, gameAmount: number) => void;
  editAction?: () => void;
  visible?: boolean;
}
interface IAmount {
  title: string;
  amount: number;
}
const GameCardContainer: FC<GameItemProps> = ({
  id,
  title,
  age,
  description,
  genre,
  category,
  logo,
  rating,
  price,
}) => {
  const dispatch = useDispatch();
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
  const role = useSelector((state: ReducerState) => state.reducer.role);
  const [visible, setVisible] = useState<boolean>(false);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);

  const addGame = async (
    gameTitle: string,
    gameCategory: string,
    gamePrice: number,
    gameCheck: boolean,
    gameAmount: number
  ) => {
    if (gamesList.some((game) => game.title === gameTitle)) {
      const amountGame = gamesList.filter((game) => game.title === title);
      dispatch(changeGameAmountAction({ title: amountGame[0].title, amount: amountGame[0].amount + 1 } as IAmount));
      return;
    }
    dispatch(
      addGameToCartAction({
        title: gameTitle,
        category: gameCategory,
        price: gamePrice,
        check: gameCheck,
        amount: gameAmount,
      })
    );
    const reqBody = gamesList.concat({
      title: gameTitle,
      category: gameCategory,
      price: gamePrice,
      check: gameCheck,
      amount: gameAmount,
    });
    await apiCall(userCartUrl + userName, CallType.POST, { gamesList: reqBody });
  };

  const editAction = () => {
    const rate = +rating;

    dispatch(
      addGameToEditAction({ id, title, description, age, category, genre, imgUrl: logo, rate, price } as GameToEdit)
    );
    dispatch(showModalAction(ModalTypes.EDITGAME));
  };

  useEffect(() => {
    if (role === Roles.ADMIN) setVisible(true);
  }, [role]);

  return (
    <GameCard
      title={title}
      description={description}
      category={category}
      logo={logo}
      rating={rating}
      price={price}
      action={addGame}
      editAction={editAction}
      visible={visible}
    />
  );
};

export default GameCardContainer;
