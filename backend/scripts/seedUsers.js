import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERRO: defina DATABASE_URL nas variáveis de ambiente antes de rodar o seed.');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    console.log('Garantindo extensão pgcrypto...');
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");

    const users = [
      { name: 'Admin', email: 'admin@hydrate.com', password: 'admin123', role: 'ADMIN' },
      { name: 'Atendente', email: 'funcionario@hydrate.com', password: 'func123', role: 'ATENDENTE' },
      { name: 'Proprietário', email: process.env.PROPRIETARIO_EMAIL || 'owner@hydrate.com', password: process.env.PROPRIETARIO_PASSWORD || 'owner123', role: 'ADMIN' }
    ];

    for (const u of users) {
      const res = await client.query('SELECT id FROM users WHERE email = $1', [u.email]);
      if (res.rowCount > 0) {
        console.log(`Usuário já existe: ${u.email} — pulando`);
        continue;
      }

      const hash = await bcrypt.hash(u.password, 10);
      await client.query(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES (gen_random_uuid(), $1, $2, $3, $4)`,
        [u.name, u.email, hash, u.role]
      );
      console.log(`Criado usuário: ${u.email} (senha: ${u.password})`);
    }

    console.log('Seed finalizado.');
  } catch (err) {
    console.error('Erro durante seed:', err.message || err);
  } finally {
    await client.end();
  }
}

seed();
