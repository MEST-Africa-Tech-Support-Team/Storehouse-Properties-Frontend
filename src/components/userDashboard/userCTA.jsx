import React from 'react';
import { Link } from 'react-router';

const CTASection = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '24px' }}>
      <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧭</div>
      <h2 style={{ margin: '0 0 12px 0', fontSize: '24px' }}>Ready for Your Next Adventure?</h2>
      <p style={{ margin: '0 0 20px 0', color: '#666' }}>Discover thousands of unique properties around the world</p>
      <Link
        to="/properties"
        style={{
          padding: '12px 32px',
          backgroundColor: '#0066ff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500'
        }}
      >
        Explore Properties
      </Link>
    </div>
  );
};

export default CTASection;