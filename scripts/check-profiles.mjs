import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const profilesDir = resolve('profiles')
const capabilitiesDir = resolve('capabilities')
const required = ['id', 'name', 'targets', 'stack', 'allowed', 'forbidden', 'backend', 'verification']
const capabilityRequired = ['id', 'name', 'appliesTo', 'allowed', 'rules', 'verification']
const capabilityEntries = await readdir(capabilitiesDir, { withFileTypes: true })
const entries = await readdir(profilesDir, { withFileTypes: true })
const profiles = []
const capabilities = new Map()

for (const entry of capabilityEntries) {
  if (!entry.isDirectory()) continue

  const path = resolve(capabilitiesDir, entry.name, 'capability.json')
  const capability = JSON.parse(await readFile(path, 'utf8'))
  const missing = capabilityRequired.filter((key) => !(key in capability))

  if (missing.length > 0) throw new Error(`${entry.name}: missing ${missing.join(', ')}`)
  if (capability.id !== entry.name) throw new Error(`${entry.name}: id must match directory name`)
  if (!Array.isArray(capability.appliesTo) || !Array.isArray(capability.allowed) || !Array.isArray(capability.rules) || !Array.isArray(capability.verification)) {
    throw new Error(`${entry.name}: appliesTo, allowed, rules, and verification must be arrays`)
  }
  if (new Set(capability.appliesTo).size !== capability.appliesTo.length) {
    throw new Error(`${entry.name}: appliesTo must not contain duplicates`)
  }
  capabilities.set(capability.id, capability)
}

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
  if (profile.capabilities !== undefined && (!Array.isArray(profile.capabilities) || new Set(profile.capabilities).size !== profile.capabilities.length)) {
    throw new Error(`${entry.name}: capabilities must be an array without duplicates`)
  }

  const overlap = profile.allowed.filter((item) => profile.forbidden.includes(item))
  if (overlap.length > 0) throw new Error(`${entry.name}: allowed and forbidden overlap: ${overlap.join(', ')}`)

  for (const capabilityId of profile.capabilities ?? []) {
    const capability = capabilities.get(capabilityId)
    if (!capability) throw new Error(`${entry.name}: unknown capability ${capabilityId}`)
    if (!capability.appliesTo.includes(profile.id)) {
      throw new Error(`${entry.name}: capability ${capabilityId} does not apply to this profile`)
    }
  }
  profiles.push(profile.id)
}

if (profiles.length === 0) throw new Error('No profiles found')
console.log(`Validated ${profiles.length} stack profiles and ${capabilities.size} capabilities: ${profiles.join(', ')}`)
