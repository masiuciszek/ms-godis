import * as React from 'react';
import NavList from './NavList';
import './nav.css';

interface Props {

}

const Navbar: React.FC<Props> = () => (
  <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light mb-5">
    <NavList />
  </nav>
);
export default Navbar;
