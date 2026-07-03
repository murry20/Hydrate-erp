import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import styles from './Dashboard.module.css';
import { TrendingUp, Clock, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const role = localStorage.getItem('role');

  if (role !== 'ADMIN') {
    return <p style={{color: 'var(--danger)', padding: '24px'}}>Acesso negado. Você não tem permissão para visualizar este painel.</p>;
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <p>Carregando dashboard...</p>;

  return (
    <div>
      <h1 className={styles.title}>Dashboard Operacional</h1>
      
      <div className={styles.grid}>
        <Card className={styles.statCard}>
          <div className={styles.statTitle}>Vendas de Hoje</div>
          <div className={styles.statValue} style={{color: 'var(--success)'}}>
            R$ {data.totalSales.toFixed(2)}
          </div>
          <TrendingUp color="var(--success)" size={24} />
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statTitle}>Pedidos Pendentes</div>
          <div className={styles.statValue} style={{color: 'var(--accent-color)'}}>
            {data.pendingOrders}
          </div>
          <Clock color="var(--accent-color)" size={24} />
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statTitle}>Entregas Concluídas</div>
          <div className={styles.statValue}>
            {data.completedOrders}
          </div>
        </Card>
      </div>

      <Card className={styles.chartCard}>
        <div className={styles.statTitle} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <MapPin size={20}/> Top Regiões
        </div>
        <ul className={styles.regionList}>
          {data.topRegions.map((r, i) => (
            <li key={i} className={styles.regionItem}>
              <span>{r.region}</span>
              <span style={{fontWeight: 'bold', color: 'var(--accent-color)'}}>{r.count} entregas</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
