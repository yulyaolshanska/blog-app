import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link} end>
          Home
        </NavLink>
        <NavLink to="/create" className={styles.link}>
          Create Post
        </NavLink>
      </nav>
    </header>
  );
};
