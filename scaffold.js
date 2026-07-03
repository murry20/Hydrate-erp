const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content.trim() + '\n');
};

// --- BACKEND ---
write('backend/server.js', `
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`);

write('backend/routes/authRoutes.js', `
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;
`);

write('backend/controllers/authController.js', `
exports.login = async (req, res) => {
    const { email, password } = req.body;
    // Mock authentication for MVP
    if (email === 'admin@hydrate.com' && password === 'admin123') {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Admin', role: 'admin' } });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
};
`);

write('backend/routes/productRoutes.js', `
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

module.exports = router;
`);

write('backend/controllers/productController.js', `
// Mock DB until Supabase is connected
const products = [
    { id: 1, name: 'Água 20L', description: 'Galão de Água 20L (Retornável)', price: 15.00, stock_quantity: 150 },
    { id: 2, name: 'Água 500ml', description: 'Fardo de água mineral sem gás (12 un)', price: 12.00, stock_quantity: 300 },
    { id: 3, name: 'Água 1.5L', description: 'Fardo de água mineral sem gás (6 un)', price: 18.00, stock_quantity: 120 }
];

exports.getProducts = async (req, res) => {
    res.json(products);
};
`);

write('backend/routes/orderRoutes.js', `
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);

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
`);

write('backend/services/orderService.js', `
exports.calculateAndCreateOrder = async (customerId, items, region) => {
    // Taxas simuladas por região
    const regionTaxes = {
        'ZONA_NORTE': 5.00,
        'ZONA_SUL': 8.00,
        'ZONA_LESTE': 6.00,
        'ZONA_OESTE': 7.00,
        'CENTRO': 3.00
    };

    const deliveryFee = regionTaxes[region] || 10.00; // Default tax se não encontrar
    
    // Calcula os subtotais e o total final
    let itemsTotal = 0;
    const processedItems = items.map(item => {
        const subtotal = item.quantity * item.unitPrice;
        itemsTotal += subtotal;
        return { ...item, subtotal };
    });

    const totalAmount = itemsTotal + deliveryFee;

    // Retorna o pedido simulado
    const mockOrder = {
        id: Math.floor(Math.random() * 10000),
        customerId,
        status: 'PENDING',
        itemsTotal,
        deliveryFee,
        totalAmount,
        region,
        items: processedItems,
        createdAt: new Date().toISOString()
    };

    return mockOrder;
};
`);

// --- FRONTEND ---
write('frontend/src/index.css', `
:root {
  --bg-primary: #0f1115;
  --bg-secondary: #1a1d24;
  --bg-tertiary: #242832;
  --text-primary: #f8f9fa;
  --text-secondary: #a0aab5;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --danger: #ef4444;
  --success: #10b981;
  --border-color: #2e3340;
  
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  
  --font-family: 'Inter', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
`);

write('frontend/src/App.jsx', `
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Stock from './pages/Stock';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
`);

write('frontend/src/main.jsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

write('frontend/src/components/Input.module.css', `
.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
}

.input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
`);

write('frontend/src/components/Input.jsx', `
import React from 'react';
import styles from './Input.module.css';

export default function Input({ label, id, ...props }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}
`);

write('frontend/src/components/Button.module.css', `
.button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.button:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

.button.secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.button.secondary:hover {
  background-color: var(--border-color);
}
`);

write('frontend/src/components/Button.jsx', `
import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', ...props }) {
  const className = \`\${styles.button} \${variant === 'secondary' ? styles.secondary : ''}\`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
`);

write('frontend/src/components/Card.module.css', `
.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
`);

write('frontend/src/components/Card.jsx', `
import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, className = '' }) {
  return (
    <div className={\`\${styles.card} \${className}\`}>
      {children}
    </div>
  );
}
`);

write('frontend/src/components/Table.module.css', `
.tableContainer {
  width: 100%;
  overflow-x: auto;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.th {
  padding: 16px 24px;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.td {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.tr:last-child .td {
  border-bottom: none;
}

.tr:hover .td {
  background-color: rgba(255, 255, 255, 0.02);
}

.statusBadge {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
}
`);

write('frontend/src/components/Table.jsx', `
import React from 'react';
import styles from './Table.module.css';

export default function Table({ columns, data }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={styles.th}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={styles.tr}>
              {columns.map((col, j) => (
                <td key={j} className={styles.td}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={styles.td} style={{textAlign: 'center', color: 'var(--text-secondary)'}}>
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
`);

write('frontend/src/pages/Login.module.css', `
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: radial-gradient(circle at top, var(--bg-tertiary) 0%, var(--bg-primary) 60%);
}

.loginCard {
  width: 100%;
  max-width: 420px;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo span {
  color: var(--accent-color);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  padding: 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
`);

write('frontend/src/pages/Login.jsx', `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css';
import { Droplet } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/stock');
      } else {
        setError(data.message || 'Erro ao realizar login');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Droplet color="var(--accent-color)" size={32} />
            Hydrate<span>ERP</span>
          </div>
          <p className={styles.subtitle}>Gestão Logística e Pedidos</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <Input 
            label="E-mail" 
            type="email" 
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@hydrate.com"
            required
          />
          <Input 
            label="Senha" 
            type="password" 
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="admin123"
            required
          />
          <div style={{ marginTop: '32px' }}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
`);

write('frontend/src/pages/Stock.module.css', `
.page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2rem;
}

.actions {
  display: flex;
  gap: 16px;
}

.stockBadge {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--accent-color);
}
`);

write('frontend/src/pages/Stock.jsx', `
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
      cell: (row) => \`R$ \${row.price.toFixed(2)}\`
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
          <Button>
            <Plus size={18} /> Novo Produto
          </Button>
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
`);

write('frontend/index.html', `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hydrate ERP</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

console.log("Scaffold complete.");
