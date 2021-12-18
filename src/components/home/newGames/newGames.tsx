import GameCard from "@/components/gameCard/gameCard";
import { fetchNewProductsLink } from "@/constants/constants";
import { useState, useEffect, FC } from "react";
import "./newGames.scss";

const NewGames: FC = () => {
  const [newGamesList, setNewGamesList] = useState([]);

  useEffect(() => {
    async function newGameFetching() {
      setNewGamesList(await (await fetch(fetchNewProductsLink)).json());
    }
    newGameFetching();
  }, []);

  return (
    <>
      <div className="newGame__container">
        <div className="newGame__title-container">
          <h1 className="newGame__title">New games</h1>
        </div>
        <div className="newGame__content-container">
          {newGamesList.map(({ title, description, date, category, logo }) => (
            <GameCard title={title} description={description} date={date} category={category} logo={logo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NewGames;
