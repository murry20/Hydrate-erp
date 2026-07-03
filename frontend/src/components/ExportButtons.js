import React from 'react';
import api from '../services/api';

function ExportButtons() {
  const exportarPDF = () => {
    window.open('http://localhost:5000/api/relatorios/pdf', '_blank');
  };

  const exportarExcel = () => {
    window.open('http://localhost:5000/api/relatorios/excel', '_blank');
  };

  return (
    <div className="flex gap-4 mb-6">
      <button onClick={exportarPDF} className="bg-purple-600 text-white px-4 py-2 rounded">
        Exportar PDF
      </button>
      <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">
        Exportar Excel
      </button>
    </div>
  );
}

export default ExportButtons;
