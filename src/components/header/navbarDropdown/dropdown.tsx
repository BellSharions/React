import { NavLink } from "react-router-dom";
import "./dropdown.scss";

type subroute = { routeName: string; route: string };
type INavProps = {
  name: string;
  subLinks: Array<subroute>;
};
const Dropdown: React.FC<INavProps> = (props: INavProps) => (
  <div className="dropdown">
    <div className="dropdown__button-container">
      <input className="dropbtn" type="button" value={props.name} />
      <i className="fa fa-caret-down" />
    </div>
    <div className="dropdown__content">
      {props.subLinks.map(({ routeName, route }: subroute) => (
        <NavLink className="content__link" key={routeName} to={route}>
          {routeName}
        </NavLink>
      ))}
    </div>
  </div>
);
export default Dropdown;
