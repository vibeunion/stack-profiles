import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const profilesDir = resolve('profiles')
const required = ['id', 'name', 'targets', 'stack', 'allowed', 'forbidden', 'backend', 'verification']
const entries = await readdir(profilesDir, { withFileTypes: true })
const profiles = []

for (const entry of entries) {
  if (!entry.isDirectory()) continue

  const path = resolve(profilesDir, entry.name, 'profile.json')
  const profile = JSON.parse(await readFile(path, 'utf8'))
  const missing = required.filter((key) => !(key in profile))

  if (missing.length > 0) throw new Error(`${entry.name}: missing ${missing.join(', ')}`)
  if (profile.id !== entry.name) throw new Error(`${entry.name}: id must match directory name`)
  if (!Array.isArray(profile.allowed) || !Array.isArray(profile.forbidden)) {
    throw new Error(`${entry.name}: allowed and forbidden must be arrays`)
  }

  const overlap = profile.allowed.filter((item) => profile.forbidden.includes(item))
  if (overlap.length > 0) throw new Error(`${entry.name}: allowed and forbidden overlap: ${overlap.join(', ')}`)
  profiles.push(profile.id)
}

if (profiles.length === 0) throw new Error('No profiles found')
console.log(`Validated ${profiles.length} stack profiles: ${profiles.join(', ')}`)
