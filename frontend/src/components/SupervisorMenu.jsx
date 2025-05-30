import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/SupervisorHomepage.module.css';

// This is the navigation menu for the Supervisor
const SupervisorMenu = () => {
  return (
    <div className={styles.menu}>
        <p><Link to="/supervisor-homepage">Home</Link></p>
        <p><Link to="/manage-artists">Manage Artists</Link></p>
        <p><Link to="/manage-artifacts">Manage Artifacts</Link></p>
        <p><Link to="/manage-events">Manage Events</Link></p>
        <p><Link to="/manage-exhibits">Manage Exhibits</Link></p>
        <p><Link to="/logs-edits">Logs for Edits</Link></p>
    </div>
  );
};

export default SupervisorMenu;
