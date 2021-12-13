import { NavLink } from "react-router-dom";

const Products: React.FC = () => (
  <>
    <p>Products</p>
    <NavLink to="/error">Click this link to cause an error</NavLink>
  </>
);

export default Products;
