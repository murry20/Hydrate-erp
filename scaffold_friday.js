const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content.trim() + '\n');
};

// 1. BACKEND UPDATES
write('backend/server.js', `
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`);

write('backend/routes/dashboardRoutes.js', `
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getDashboardData);

module.exports = router;
`);

write('backend/controllers/dashboardController.js', `
exports.getDashboardData = async (req, res) => {
    res.json({
        totalSales: 4580.00,
        pendingOrders: 12,
        completedOrders: 45,
        topRegions: [
            { region: 'ZONA_SUL', count: 25 },
            { region: 'CENTRO', count: 15 },
            { region: 'ZONA_NORTE', count: 10 }
        ]
    });
};
`);

write('backend/routes/orderRoutes.js', `
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.post('/calculate', orderController.calculateOrder);

module.exports = router;
`);

write('backend/controllers/orderController.js', `
const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const { customerId, items, region } = req.body;
        const order = await orderService.calculateAndCreateOrder(customerId, items, region);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.calculateOrder = async (req, res) => {
    try {
        const { items, region } = req.body;
        const calculation = await orderService.calculateOrderOnly(items, region);
        res.json(calculation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
`);

write('backend/services/orderService.js', `
const regionTaxes = {
    'ZONA_NORTE': 5.00,
    'ZONA_SUL': 8.00,
    'ZONA_LESTE': 6.00,
    'ZONA_OESTE': 7.00,
    'CENTRO': 3.00
};

exports.calculateOrderOnly = async (items, region) => {
    const deliveryFee = regionTaxes[region] || 10.00;
    let itemsTotal = 0;
    const processedItems = items.map(item => {
        const subtotal = item.quantity * item.unitPrice;
        itemsTotal += subtotal;
        return { ...item, subtotal };
    });
    return {
        itemsTotal,
        deliveryFee,
        totalAmount: itemsTotal + deliveryFee,
        processedItems
    };
};

exports.calculateAndCreateOrder = async (customerId, items, region) => {
    const calc = await exports.calculateOrderOnly(items, region);
    
    const mockOrder = {
        id: Math.floor(Math.random() * 10000),
        customerId,
        status: 'PENDING',
        itemsTotal: calc.itemsTotal,
        deliveryFee: calc.deliveryFee,
        totalAmount: calc.totalAmount,
        region,
        items: calc.processedItems,
        createdAt: new Date().toISOString()
    };
    return mockOrder;
};
`);

// 2. FRONTEND - SIDEBAR & LAYOUT
write('frontend/src/components/Sidebar.module.css', `
.sidebar {
  width: 260px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  padding: 24px;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
}

.logo span {
  color: var(--accent-color);
}

.nav {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.navLink {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.navLink:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.navLink.active {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--accent-color);
}

.footer {
  padding: 24px 16px;
  border-top: 1px solid var(--border-color);
}
`);

write('frontend/src/components/Sidebar.jsx', `
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Droplet } from 'lucide-react';
import styles from './Sidebar.module.css';
import Button from './Button';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Droplet color="var(--accent-color)" size={24} />
        Hydrate<span>ERP</span>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? \`\${styles.navLink} \${styles.active}\` : styles.navLink}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/orders" className={({isActive}) => isActive ? \`\${styles.navLink} \${styles.active}\` : styles.navLink}>
          <ShoppingCart size={20} />
          Pedidos
        </NavLink>
        <NavLink to="/stock" className={({isActive}) => isActive ? \`\${styles.navLink} \${styles.active}\` : styles.navLink}>
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
`);

write('frontend/src/layouts/MainLayout.module.css', `
.layout {
  display: flex;
  min-height: 100vh;
}
.content {
  flex: 1;
  margin-left: 260px;
  padding: 40px;
  background-color: var(--bg-primary);
}
`);

write('frontend/src/layouts/MainLayout.jsx', `
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
`);

// 3. DASHBOARD PAGE
write('frontend/src/pages/Dashboard.module.css', `
.title {
  font-size: 2rem;
  margin-bottom: 32px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.statCard {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.statTitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}
.statValue {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.chartCard {
  grid-column: 1 / -1;
}
.regionList {
  list-style: none;
  margin-top: 16px;
}
.regionItem {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}
.regionItem:last-child {
  border-bottom: none;
}
`);

write('frontend/src/pages/Dashboard.jsx', `
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import styles from './Dashboard.module.css';
import { TrendingUp, Clock, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);

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
`);

// 4. ORDERS PAGE (CHECKOUT ENGINE)
write('frontend/src/pages/Orders.module.css', `
.title {
  font-size: 2rem;
  margin-bottom: 32px;
}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}
.sectionTitle {
  font-size: 1.25rem;
  margin-bottom: 24px;
  color: var(--text-primary);
}
.productSelect {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 24px;
}
.productSelect > div {
  flex: 1;
}
.orderItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}
.summaryRow {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  color: var(--text-secondary);
}
.summaryTotal {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 16px;
  border-top: 1px solid var(--border-color);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.empty {
  color: var(--text-secondary);
  text-align: center;
  padding: 32px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
}
`);

write('frontend/src/pages/Orders.jsx', `
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Orders.module.css';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [region, setRegion] = useState('CENTRO');
  
  const [calculation, setCalculation] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      fetch('http://localhost:5000/api/orders/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, region })
      })
      .then(res => res.json())
      .then(setCalculation)
      .catch(console.error);
    } else {
      setCalculation(null);
    }
  }, [items, region]);

  const handleAddItem = () => {
    if (!selectedProduct) return;
    const prod = products.find(p => p.id == selectedProduct);
    if (!prod) return;
    
    setItems(prev => {
      const existing = prev.find(i => i.productId === prod.id);
      if (existing) {
        return prev.map(i => i.productId === prod.id ? { ...i, quantity: i.quantity + Number(quantity) } : i);
      }
      return [...prev, { productId: prod.id, name: prod.name, unitPrice: prod.price, quantity: Number(quantity) }];
    });
    setQuantity(1);
    setSelectedProduct('');
  };

  const handleRemoveItem = (id) => {
    setItems(prev => prev.filter(i => i.productId !== id));
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: 1, items, region })
      });
      if (res.ok) {
        setSuccess(true);
        setItems([]);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Novo Pedido</h1>
      
      {success && (
        <div style={{backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <CheckCircle /> Pedido criado com sucesso!
        </div>
      )}

      <div className={styles.grid}>
        <div>
          <Card style={{marginBottom: '24px'}}>
            <h2 className={styles.sectionTitle}>Dados da Entrega</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'}}>
              <label style={{fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500}}>Região de Entrega</label>
              <select 
                value={region} 
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  padding: '12px', borderRadius: 'var(--radius-md)', 
                  backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'inherit'
                }}
              >
                <option value="CENTRO">Centro</option>
                <option value="ZONA_NORTE">Zona Norte</option>
                <option value="ZONA_SUL">Zona Sul</option>
                <option value="ZONA_LESTE">Zona Leste</option>
                <option value="ZONA_OESTE">Zona Oeste</option>
              </select>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Adicionar Produtos</h2>
            <div className={styles.productSelect}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', flex: 2}}>
                <label style={{fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500}}>Produto</label>
                <select 
                  value={selectedProduct} 
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  style={{
                    padding: '12px', borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'inherit'
                  }}
                >
                  <option value="">Selecione...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - R$ {p.price.toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <div style={{flex: 1}}>
                <Input 
                  label="Qtd" 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                />
              </div>
              <div style={{flex: '0 0 auto', paddingBottom: '16px'}}>
                <Button onClick={handleAddItem} style={{width: 'auto', padding: '12px'}}><Plus size={20}/></Button>
              </div>
            </div>

            <div style={{marginTop: '32px'}}>
              {items.length === 0 ? (
                <div className={styles.empty}>Nenhum produto adicionado</div>
              ) : (
                items.map(item => (
                  <div key={item.productId} className={styles.orderItem}>
                    <div>
                      <div style={{fontWeight: 500}}>{item.name}</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                        {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.productId)}
                      style={{background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '8px'}}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card style={{position: 'sticky', top: '40px'}}>
            <h2 className={styles.sectionTitle}>Resumo do Pedido</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal Itens</span>
              <span>R$ {calculation ? calculation.itemsTotal.toFixed(2) : '0.00'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Taxa de Entrega</span>
              <span>R$ {calculation ? calculation.deliveryFee.toFixed(2) : '0.00'}</span>
            </div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>R$ {calculation ? calculation.totalAmount.toFixed(2) : '0.00'}</span>
            </div>

            <Button 
              style={{marginTop: '24px'}} 
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              Finalizar Pedido
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
`);

// 5. UPDATE APP.JSX TO USE LAYOUT
write('frontend/src/App.jsx', `
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Stock from './pages/Stock';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stock" element={<Stock />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
`);
console.log('Friday scaffold complete.');
