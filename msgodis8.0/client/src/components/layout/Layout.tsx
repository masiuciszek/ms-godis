import * as React from 'react';
import Navbar from './navbar/Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Navbar />
    <main id="MainApp">
      {children}
    </main>
  </>
);
export default Layout;
