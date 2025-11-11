import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {

        if (to === '/login' && isActive) {
          return className;
        }
        return `${className} ${isActive ? "text-green-700 font-bold" : ""}`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
