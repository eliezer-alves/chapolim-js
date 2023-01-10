import { generateDiagram } from '../../utils/diagramFileSystem'

export function showDiagram(appBasePath: string, name: string) {
  const modulePath = `${appBasePath}\\src\\modules\\${name}`
  return generateDiagram(modulePath)
}
