import * as fs from 'fs'
import { Dirent } from 'fs'
import { basename } from 'path'

interface TreeNode {
  name: string
  children?: TreeNode[]
}

export function generateTree(path: string, depth = 0, maxDepth = 2): TreeNode[] {
  const tree: TreeNode[] = []

  if (depth > maxDepth) {
    return []
  }

  const entries: Dirent[] = fs.readdirSync(path, { withFileTypes: true })
  for (const entry of entries) {
    const name = entry.name
    if (entry.isDirectory()) {
      const node: TreeNode = {
        name,
        children: generateTree(`${path}/${name}`, depth + 1, maxDepth),
      }
      tree.push(node)
    } else {
      tree.push({ name })
    }
  }

  return tree
}
