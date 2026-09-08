import { spawn } from 'node:child_process'

function run(args, env) {
  const child = spawn('npm', args, {
    stdio: 'inherit',
    shell: true,
    env: env ? { ...process.env, ...env } : process.env,
  })
  child.on('exit', shutdown)
  return child
}

// Overrides an inherited PORT (e.g. from a dev-preview host) that would otherwise shadow
// backend/.env's own PORT via Node's --env-file, which never overrides an already-set var.
const children = [run(['run', 'server'], { PORT: '4000' }), run(['run', 'dev'])]

let shuttingDown = false
function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) child.kill()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
