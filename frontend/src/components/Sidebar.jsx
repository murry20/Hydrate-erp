import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Droplet } from 'lucide-react';
import styles from './Sidebar.module.css';
import Button from './Button';

export default function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Droplet color="var(--accent-color)" size={24} />
        Hydrate<span>ERP</span>
      </div>
      <nav className={styles.nav}>
        {role === 'ADMIN' && (
        <NavLink to="/dashboard" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        )}
        <NavLink to="/orders" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <ShoppingCart size={20} />
          Pedidos
        </NavLink>
        <NavLink to="/stock" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          <Package size={20} />
          Estoque
        </NavLink>
      </nav>
      <div className={styles.footer}>
        <Button variant="secondary" onClick={handleLogout} style={{width: '100%'}}>
          <LogOut size={18} /> Sair
        </Button>
      </div>
    </div>
  );
}
