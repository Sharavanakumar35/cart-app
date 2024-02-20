import React from 'react';
import { CartFill } from 'react-bootstrap-icons';
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { totalCost, totalQuantity } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">Shopping Cart</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <NavItem active={true} link="#!" text="Home" />
            <NavItem active={false} link="#!" text="About" />
            <DropdownNavItem />
          </ul>
          <div className='me-5'><strong>Total Price: </strong>${totalCost}</div>
          <CartButton cartValue={totalQuantity} />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ active, link, text }) => {
  return (
    <li className="nav-item">
      <a className={`nav-link ${active ? 'active' : ''}`} href={link}>{text}</a>
    </li>
  );
};

const DropdownNavItem = () => {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a className="dropdown-item" href="#!">All Products</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#!">Popular Items</a></li>
        <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
      </ul>
    </li>
  );
};

const CartButton = ({ cartValue }) => {
  return (
    <form className="d-flex">
      <button className="btn btn-outline-dark" type="submit">
        <CartFill />
        <span className='ms-2'>Cart</span>
        <span className="badge bg-dark text-white ms-2 rounded-pill">{cartValue}</span>
      </button>
    </form>
  );
};


export default Navbar;
