import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink 
          style={({ isActive }) => isActive ? activeStyle : null} 
          to="."
          end
        >
          Dashboard
        </NavLink>
        <NavLink 
          style={({ isActive }) => isActive ? activeStyle : null} 
          to="income"
        >
          Income
        </NavLink>
        <NavLink 
            to="vans"
            style={({isActive}) => isActive ? activeStyle : null}
        >
            Vans
        </NavLink>
        <NavLink 
          style={({ isActive }) => isActive ? activeStyle : null} 
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;
