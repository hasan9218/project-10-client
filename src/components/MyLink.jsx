import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ to, className, children }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive ? "text-pink-400 font-bold" : `${className}`

            }
          >
            {children}
            </NavLink>
    );
};

export default MyLink;