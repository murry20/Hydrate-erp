const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content.trim() + '\n');
};

write('backend/controllers/authController.js', `
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@hydrate.com' && password === 'admin123') {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Admin', role: 'ADMIN' } });
    } else if (email === 'funcionario@hydrate.com' && password === 'func123') {
        res.json({ token: 'mock-jwt-token', user: { id: 2, name: 'Atendente', role: 'ATENDENTE' } });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
};
`);

let login = fs.readFileSync('frontend/src/pages/Login.jsx', 'utf-8');
login = login.replace("localStorage.setItem('token', data.token);", "localStorage.setItem('token', data.token);\n        localStorage.setItem('role', data.user.role);");
login = login.replace("navigate('/stock');", "if (data.user.role === 'ADMIN') { navigate('/dashboard'); } else { navigate('/orders'); }");
fs.writeFileSync('frontend/src/pages/Login.jsx', login);

let sidebar = fs.readFileSync('frontend/src/components/Sidebar.jsx', 'utf-8');
sidebar = sidebar.replace("const handleLogout", "const role = localStorage.getItem('role');\n\n  const handleLogout");
sidebar = sidebar.replace("localStorage.removeItem('token');", "localStorage.removeItem('token');\n    localStorage.removeItem('role');");
sidebar = sidebar.replace(`<NavLink to="/dashboard" className={({isActive}) => isActive ? \`\${styles.navLink} \${styles.active}\` : styles.navLink}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>`, `{role === 'ADMIN' && (
        <NavLink to="/dashboard" className={({isActive}) => isActive ? \`\${styles.navLink} \${styles.active}\` : styles.navLink}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        )}`);
fs.writeFileSync('frontend/src/components/Sidebar.jsx', sidebar);

let stock = fs.readFileSync('frontend/src/pages/Stock.jsx', 'utf-8');
stock = stock.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n  const role = localStorage.getItem('role');");
stock = stock.replace(`<Button>
            <Plus size={18} /> Novo Produto
          </Button>`, `{role === 'ADMIN' && (
          <Button>
            <Plus size={18} /> Novo Produto
          </Button>
          )}`);
fs.writeFileSync('frontend/src/pages/Stock.jsx', stock);

let dashboard = fs.readFileSync('frontend/src/pages/Dashboard.jsx', 'utf-8');
dashboard = dashboard.replace("const [data, setData] = useState(null);", "const [data, setData] = useState(null);\n  const role = localStorage.getItem('role');\n\n  if (role !== 'ADMIN') {\n    return <p style={{color: 'var(--danger)', padding: '24px'}}>Acesso negado. Você não tem permissão para visualizar este painel.</p>;\n  }");
fs.writeFileSync('frontend/src/pages/Dashboard.jsx', dashboard);

console.log('RBAC setup complete.');
