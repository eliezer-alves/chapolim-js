import { FS } from '../../utils'

type showResult = {
  name: string
  children: FS.TreeNode[]
} | null

export function showDiagram(appBasePath: string, name: string) {
  const modulePath = `${appBasePath}\\src\\modules\\${name}`
  return FS.generateDiagram(modulePath, 0, 2)
}

export function show(appBasePath: string, name: string): showResult {
  const modulePath = `${appBasePath}\\src\\modules\\${name}`
  const tree = FS.generateTree(modulePath, 0, 10)
  if (!tree.length) return null

  return {
    name,
    children: tree,
  }
}
