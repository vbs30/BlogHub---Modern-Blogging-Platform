import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div
      style={{
        width,
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        background: 'linear-gradient(135deg, #6A11CB, #2575FC)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        textShadow: '2px 2px 8px rgba(106, 17, 203, 0.4)',
        userSelect: 'none',
      }}
    >
      VBS30
    </div>
  );
}

export default Logo;
