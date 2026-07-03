import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', ...props }) {
  const className = `${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
