import * as fs from 'fs'
import { Dirent } from 'fs'
import { basename } from 'path'

export function generateDiagram(path: string, depth = 0, maxDepth = 2): string {
  let diagram = ''

  if (depth > maxDepth) {
    return ''
  }

  if (depth === 0) {
    diagram += `📂 ${basename(path)}\n`
    depth += 1
  }

  const entries: Dirent[] = fs.readdirSync(path, { withFileTypes: true })
  for (const entry of entries) {
    const name = entry.name
    if (entry.isDirectory()) {
      diagram += `${'  '.repeat(depth)}📂 ${name}\n`
      diagram += generateDiagram(`${path}/${name}`, depth + 1, maxDepth)
    } else {
      const ext = name.split('.').pop()
      diagram += `${'  '.repeat(depth)}📄 ${name}\n`
    }
  }

  return diagram
}
