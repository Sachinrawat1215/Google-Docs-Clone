import React from 'react';
import { Logout } from '../../Images';

const Header = () => {
  return (
    <header>
      <div className="icon-logout-container">
        <img src="/images/co-write-logo.svg" alt="logo" />
        <button>
          <p>Logout</p>
          <Logout />
        </button>
      </div>
    </header>
  );
};

export default Header;
