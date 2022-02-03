import { FC, memo } from "react";
import "./newGames.scss";
import { useSelector } from "react-redux";
import GameCard from "../../common/gameCard/gameCardContainer";
import { ReducerState } from "../../../redux/reducers/reducer";

const NewGames: FC = () => {
  const newGamesList = useSelector((state: ReducerState) => state.filter.searchResult);

  return (
    <>
      <div className="newGame__container">
        <div className="newGame__title-container">
          <h1 className="newGame__title">New games</h1>
        </div>
        <div className="newGame__content-container">
          {newGamesList.slice(-3).map(({ id, title, description, date, category, logo, rating, price }) => (
            <GameCard
              key={id}
              title={title}
              description={description}
              date={date}
              category={category}
              logo={logo}
              rating={rating?.toString()}
              price={price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(NewGames);
