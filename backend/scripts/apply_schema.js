import 'dotenv/config';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function applySchema() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERRO: defina DATABASE_URL nas variáveis de ambiente antes de rodar este script.');
    process.exit(1);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sqlPath = path.resolve(__dirname, '../../database/schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('database/schema.sql não encontrado em', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    console.log('Aplicando schema...');
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
    await client.query(sql);
    console.log('Schema aplicado com sucesso.');
  } catch (err) {
    console.error('Erro ao aplicar schema:', err.message || err);
  } finally {
    await client.end();
  }
}

applySchema();
