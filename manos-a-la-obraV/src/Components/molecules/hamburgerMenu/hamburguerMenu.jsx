import React, { useState } from 'react';
import SideBar from '../../atoms/sideBar/sideBar.jsx';
import './styles.css'

export default function HamburguerMenu({ level }) {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <div className={isSidebarOpen ? "line line1 open" : "line line1"}></div>
        <div className={isSidebarOpen ? "line line2 open" : "line line2"}></div>
        <div className={isSidebarOpen ? "line line3 open" : "line line3"}></div>
      </div>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} level={level} />
    </div>
  );
}
  