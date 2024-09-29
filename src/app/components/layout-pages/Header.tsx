"use client";

import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.scrollingAlert}>
        <p>Breaking News: Our latest product has launched! Check it out now!</p>
      </div>
      {/* Other header content */}
    </header>
  );
}

export default Header;