import { NavLink } from "react-router-dom";
import "./header.scss";
import { multiLink, routes, routeType, singleLink } from "../../constants/constants";
import Dropdown from "./navbarDropdown/dropdown";

const Header: React.FC = () => (
  <header className="header">
    <h3 className="header__title">Game Market</h3>
    <div className="header__navlinks">
      {routes.map((object: singleLink | multiLink) => (
        <>
          {object.type === routeType.link && (
            <NavLink className="header__navlinks-link" key={object.item.name} to={(object as singleLink).item.route}>
              {(object as singleLink).item.name}
            </NavLink>
          )}
          {object.type === routeType.dropdown && (
            <Dropdown
              key={object.item.name}
              name={(object as multiLink).item.name}
              subLinks={(object as multiLink).item.data}
            />
          )}
        </>
      ))}
    </div>
  </header>
);

export default Header;
