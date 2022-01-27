import GameCard from "@/elements/gameCard/gameCardContainer";
import { FC, memo } from "react";
import "./newGames.scss";
import { useSelector } from "react-redux";
import { ReducerState } from "@/components/redux/reducer";

const NewGames: FC = () => {
  const newGamesList = useSelector((state: ReducerState) => state.reducer.searchResult);

  return (
    <>
      <div className="newGame__container">
        <div className="newGame__title-container">
          <h1 className="newGame__title">New games</h1>
        </div>
        <div className="newGame__content-container">
          {newGamesList.slice(0, 3).map(({ id, title, description, date, category, logo, rating, price }) => (
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
