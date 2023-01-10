const fs = require('fs')
import { Dirent } from 'fs'

export function list(appBasePath: string) {
  const modulesPath = `${appBasePath}\\src\\modules`
  const entries: Dirent[] = fs.readdirSync(modulesPath, { withFileTypes: true })
  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
}
