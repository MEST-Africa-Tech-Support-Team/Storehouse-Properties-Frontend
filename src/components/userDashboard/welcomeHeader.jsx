import React from 'react';

const WelcomeHeader = ({ userName }) => {
  return (
    <header>
      <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>Welcome, {userName}</h1>
      <p style={{ margin: 0, color: '#666' }}>Here’s an overview of your activity on Store House.</p>
    </header>
  );
};

export default WelcomeHeader;