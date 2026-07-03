import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Relatorios from './pages/Relatorios';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/relatorios" element={
          <PrivateRoute>
            <Relatorios />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" />;
  if (roles && !roles.includes(role)) return <Navigate to="/login" />;
  return children;
}

<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/relatorios" element={
    <PrivateRoute roles={['user','admin']}>
      <Relatorios />
    </PrivateRoute>
  } />
  <Route path="/admin" element={
    <PrivateRoute roles={['admin']}>
      <AdminDashboard />
    </PrivateRoute>
  } />
</Routes>

