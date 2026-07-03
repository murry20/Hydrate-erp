const Usuario = require('../models/Usuario');
// Se você tiver modelos para Logs ou Falhas, importe-os aqui, ex:
// const LoginLog = require('../models/LoginLog');

// 1. Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] } });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

// 2. Atualizar o cargo (role) de um usuário
exports.atualizarRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await Usuario.update({ role }, { where: { id } });
    res.json({ message: 'Cargo atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cargo.' });
  }
};

// 3. Excluir um usuário
exports.excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.destroy({ where: { id } });
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

// 4. Estatísticas gerais (Criadas vazias para suas rotas não quebrarem)
exports.estatisticas = async (req, res) => {
  try { res.json({ mensagem: "Estatísticas em desenvolvimento" }); } catch (e) { res.status(500).end(); }
};

exports.estatisticasLogin = async (req, res) => {
  try { res.json({ mensagem: "Estatísticas de login em desenvolvimento" }); } catch (e) { res.status(500).end(); }
};

exports.atividadeRecente = async (req, res) => {
  try { res.json({ mensagem: "Atividades recentes em desenvolvimento" }); } catch (e) { res.status(500).end(); }
};

exports.listarLogs = async (req, res) => {
  try { res.json({ mensagem: "Logs em desenvolvimento" }); } catch (e) { res.status(500).end(); }
};

exports.listarFalhasLogin = async (req, res) => {
  try { res.json({ mensagem: "Falhas de login em desenvolvimento" }); } catch (e) { res.status(500).end(); }
};