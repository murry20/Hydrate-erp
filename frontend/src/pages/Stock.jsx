import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Button from '../components/Button';
import styles from './Stock.module.css';
import { LogOut, Plus } from 'lucide-react';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Produto', accessor: 'name' },
    { header: 'Descrição', accessor: 'description' },
    { 
      header: 'Preço (R$)', 
      cell: (row) => `R$ ${row.price.toFixed(2)}`
    },
    { 
      header: 'Estoque Disponível', 
      cell: (row) => (
        <span className={styles.stockBadge}>
          {row.stock_quantity} un
        </span>
      )
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão de Estoque</h1>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </Button>
          {role === 'ADMIN' && (
          <Button>
            <Plus size={18} /> Novo Produto
          </Button>
          )}
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Carregando produtos...</p>
      ) : (
        <Table columns={columns} data={products} />
      )}
    </div>
  );
}
