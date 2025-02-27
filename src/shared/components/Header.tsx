import React from 'react';
import Logo from '../../images/singapore-lion.svg'

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-300 py-4">
      <div className="max-w-screen-lg mx-auto flex items-center">
        <img src = {Logo} alt = "Singaport Government Logo" className="h-5 w-5 mr-2" />
        <h1 className="text-2xl text-left text-gray-800">
          An Official Website of the <strong>Singapore Government</strong>
        </h1>
      </div>
    </header>
  );
};

export default Header;
