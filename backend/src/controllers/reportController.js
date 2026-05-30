const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const Usuario = require('../models/Usuario');

exports.exportarPDF = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email', 'role'] });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

    doc.pipe(res);
    doc.fontSize(18).text('Relatório de Usuários', { align: 'center' });
    doc.moveDown();

    usuarios.forEach(u => {
      doc.fontSize(12).text(`ID: ${u.id} | Nome: ${u.nome} | Email: ${u.email} | Role: ${u.role}`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
};

exports.exportarExcel = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email', 'role'] });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Usuários');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Role', key: 'role', width: 15 }
    ];

    usuarios.forEach(u => sheet.addRow(u.dataValues));

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar Excel' });
  }
};
