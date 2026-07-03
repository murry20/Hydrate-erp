const { Op } = require('sequelize');

// 1. Tenta importar o modelo Receita (evita crash se ainda não existir)
let Receita;
try {
  Receita = require('../models/Receitas'); // Tenta no plural
} catch (e) {
  try {
    Receita = require('../models/Receita'); // Tenta no singular caso exista assim
  } catch (err) {
    console.log("⚠️ Modelo 'Receita' ou 'Receitas' ainda não foi criado na pasta models.");
  }
}

// 2. Importa o modelo Despesas apontando para o seu arquivo real (Despesas.js)
let Despesa;
try {
  Despesa = require('../models/Despesas'); // Ajustado para o plural ('Despesas')
} catch (e) {
  console.log("❌ Erro grave: Arquivo 'src/models/Despesas.js' não foi encontrado.");
}

// 3. Controlador de Estatísticas Financeiras
exports.estatisticasFinanceiras = async (req, res) => {
  try {
    // Busca os dados do banco apenas se as tabelas/modelos correspondentes existirem
    const receitas = Receita ? await Receita.findAll() : [];
    const despesas = Despesa ? await Despesa.findAll() : [];

    // Faz os cálculos matemáticos garantindo a conversão para número (evita bugs de concatenação de strings)
    const totalReceitas = receitas.reduce((acc, r) => acc + Number(r.valor || 0), 0);
    const totalDespesas = despesas.reduce((acc, d) => acc + Number(d.valor || 0), 0);
    const saldo = totalReceitas - totalDespesas;

    // Retorna os resultados para o frontend
    res.json({ 
      totalReceitas, 
      totalDespesas, 
      saldo 
    });
  } catch (error) {
    console.error("Erro interno no financeController:", error);
    res.status(500).json({ error: 'Erro ao gerar estatísticas financeiras' });
  }
};