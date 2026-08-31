import { spawn } from 'node:child_process'

function run(args) {
  const child = spawn('npm', args, { stdio: 'inherit', shell: true })
  child.on('exit', shutdown)
  return child
}

const children = [run(['run', 'server']), run(['run', 'dev'])]

let shuttingDown = false
function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) child.kill()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
