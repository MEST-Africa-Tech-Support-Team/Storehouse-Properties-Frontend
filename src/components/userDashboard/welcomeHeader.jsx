import React from 'react';

const WelcomeHeader = ({ userName }) => {
  return (
    <header>
      <h1 className="text-2xl font-extrabold text-black m-0 mb-2 leading-tight">
        Welcome, {userName}
      </h1>
      <p className="text-gray-600 m-0 text-base">
        Here's an overview of your activity on Storehouse.
      </p>
    </header>
  );
};

export default WelcomeHeader;