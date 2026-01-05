import React from 'react';

const Avatar = ({ 
  src = null, 
  name = null, 
  fallback = '?', 
  size = 'md', 
  className = '' 
}) => {
  // Generate initials from name prop
  const getInitials = (fullName) => {
    if (!fullName) return fallback;
    return fullName
      .split(' ')
      .map(part => part[0]?.toUpperCase())
      .join('')
      .substring(0, 2) || fallback;
  };

  const initials = getInitials(name);

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
    xl: 'h-12 w-12 text-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    overflow-hidden
    rounded-full
    bg-gray-200 text-gray-700
    font-medium
    relative
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (
    <div className={baseClasses.trim()}>
      {src ? (
        <img
          src={src}
          alt={name || 'User profile'}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
      ) : null}
      {/* Fallback: show initials */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ display: src ? 'none' : 'flex' }}
        aria-label={name ? `Profile of ${name}` : 'User profile'}
      >
        {initials}
      </span>
    </div>
  );
};

export { Avatar };