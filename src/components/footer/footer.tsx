import "./footer.scss";
import { memo } from "react";
import { gameCompaniesIcons } from "../../constants/constants";

const Footer: React.FC = () => (
  <footer className="footer">
    <p className="footer__text">Incredible convenient</p>
    <div className="footer__icons">
      {gameCompaniesIcons.map(({ title, icon, href }) => (
        <a key={title} href={href}>
          <img className="icons__icon" src={icon} alt="Sorry, resource was not loaded!" />
        </a>
      ))}
    </div>
  </footer>
);

export default memo(Footer);
