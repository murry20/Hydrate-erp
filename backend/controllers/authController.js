export const login = async (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@hydrate.com' && password === 'admin123') {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Admin', role: 'ADMIN' } });
    } else if (email === 'funcionario@hydrate.com' && password === 'func123') {
        res.json({ token: 'mock-jwt-token', user: { id: 2, name: 'Atendente', role: 'ATENDENTE' } });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
};

export default { login };
