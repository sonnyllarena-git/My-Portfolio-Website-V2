import { createInterface } from 'node:readline/promises'
import { restoreDatabase, backupPath } from '../backend/dbBackup.js'
import { pool } from '../backend/db.js'

async function confirm() {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = await rl.question(
    `This will ERASE every current row and replace it with the snapshot at\n  ${backupPath}\n` +
      'Only do this if the database was actually wiped/reset — not to undo a normal edit.\n' +
      'Type "yes" to continue: ',
  )
  rl.close()
  return answer.trim().toLowerCase() === 'yes'
}

async function main() {
  if (!(await confirm())) {
    console.log('Aborted — no changes made.')
    return
  }
  await restoreDatabase()
  console.log('Database restored from backup.')
}

main()
  .catch((err) => {
    console.error('Restore failed:', err)
    process.exitCode = 1
  })
  .finally(() => pool.end())
