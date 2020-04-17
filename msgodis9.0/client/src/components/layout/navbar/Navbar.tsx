import * as React from 'react';
import NavList from './NavList';
import './nav.css';

interface Props {

}

const Navbar: React.FC<Props> = () => (
  <nav className="Navbar">
    <NavList />
  </nav>
);
export default Navbar;
