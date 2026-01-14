import React from 'react';
import { Link } from 'react-router';

const RecentActivity = () => {
  const activities = [
    { id: 1, title: "Beachfront Paradise Villa", viewed: "2 days ago" },
    { id: 2, title: "Mountain Retreat Cabin", viewed: "5 days ago" },
    { id: 3, title: "Urban Industrial Loft", viewed: "1 week ago" }
  ];

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Recent Activity</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {activities.map((item) => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <img src={`https://via.placeholder.com/60x60?text=${item.title.split(' ')[0]}`} alt={item.title} style={{ marginRight: '12px', borderRadius: '8px' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>Viewed {item.viewed}</p>
            </div>
            <Link
              to={`/property/${item.id}`}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;