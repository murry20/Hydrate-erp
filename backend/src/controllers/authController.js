const Usuario = require('../models/Usuario');
const LoginLog = require('../models/LoginLog'); // Importação adicionada para não dar erro
const FailedLoginLog = require('../models/FailedLoginLog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTRAR USUÁRIO (Com Criptografia e Notificação em Tempo Real)
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Criptografa a senha antes de salvar
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });

    // Notificação em tempo real via Socket.io (Se estiver ativo)
    if (req.app.get('io')) {
      req.app.get('io').emit('novoUsuario', { nome, email, role: usuario.role });
    }

    res.status(201).json({ message: 'Usuário registrado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// 2. LOGIN DE USUÁRIO (Com JWT, Logs de Sucesso/Falha e Socket.io)
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Busca o usuário no banco pelo e-mail
    const usuario = await Usuario.findOne({ where: { email } });
    
    // Caso o e-mail não exista
    if (!usuario) {
      await FailedLoginLog.create({ email, motivo: 'Usuário não encontrado' });
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha digitada com a criptografada no banco
    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) {
      await FailedLoginLog.create({ email, motivo: 'Senha inválida' });
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gera o Token JWT contendo o ID e a Role do usuário
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET || 'fallback_secret_key', // Segurança caso o .env falhe
      { expiresIn: '1h' }
    );

    // Salva o log de sucesso no banco de dados
    await LoginLog.create({ usuarioId: usuario.id });
    
    // Notifica o painel administrativo sobre o login em tempo real
    if (req.app.get('io')) {
      req.app.get('io').emit('loginUsuario', { email: usuario.email, data: new Date() });
    }

    // Retorna os dados para o frontend
    res.json({ message: 'Login realizado com sucesso', token, role: usuario.role });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};