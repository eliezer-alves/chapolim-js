import { FS } from '../../utils'

export function showDiagram(appBasePath: string, name: string) {
  const modulePath = `${appBasePath}\\src\\modules\\${name}`
  return FS.generateDiagram(modulePath, 0, 2)
}

export function show(appBasePath: string, name: string) {
  const modulePath = `${appBasePath}\\src\\modules\\${name}`
  const tree = FS.generateTree(modulePath, 0, 10)
  if (!tree.length) return {}

  return {
    name,
    children: tree,
  }
}
