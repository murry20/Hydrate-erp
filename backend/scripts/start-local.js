import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..'); // backend folder
const projectRoot = path.resolve(repoRoot, '..');

function spawnProcess(command, args, cwd, name) {
  const ps = spawn(command, args, { cwd, shell: true, stdio: 'inherit' });
  ps.on('error', (err) => console.error(`${name} failed:`, err));
  ps.on('exit', (code) => console.log(`${name} exited with ${code}`));
  return ps;
}

console.log('Starting backend and frontend...');

// Start backend
spawnProcess('node', ['src/index.js'], repoRoot, 'backend');

// Start frontend
spawnProcess('npm', ['run', 'dev'], path.join(projectRoot, 'frontend'), 'frontend');

// Open browser after a short delay
setTimeout(() => {
  open('http://localhost:5173').catch(() => console.log('Abra manualmente: http://localhost:5173'));
}, 5000);
