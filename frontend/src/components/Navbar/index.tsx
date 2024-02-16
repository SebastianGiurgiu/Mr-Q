import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to="/" className="navbar__link">
            Dashboard
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/profile" className="navbar__link">
            Profile
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/statements" className="navbar__link">
            Statements
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
