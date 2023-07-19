import { StringUtil } from '../../../utils'

const fs = require('fs')

const USE_CONTEXT_STUB = fs.readFileSync(`${__dirname}/stubs/use-context.stub`, 'utf8')

function geStub(name: string) {
  return USE_CONTEXT_STUB.replaceAll('$name', name)
}

function createHookFolder(folderPath: string) {
  fs.mkdirSync(folderPath, { recursive: true })
}

const createFile = (filePath: string, stub: string) => {
  fs.writeFileSync(filePath, stub)
  console.log('created file: ' + filePath)
}

const publishInIndex = (modulePath: string, mutatedName: string) => {
  const filePath = `${modulePath}/hooks/index.tsx`
  const content = `export * from './${mutatedName}/${mutatedName}';\n`
  if (!fs.existsSync(filePath)) {
    createFile(filePath, '')
  }

  fs.appendFileSync(filePath, content, 'utf8')
}

export function createUseContext(appBasePath: string, moduleName: string, name: string) {
  moduleName = `${moduleName}Module`.replace('ModuleModule', 'Module')
  const mutatedName = StringUtil.toCamelCase(`use_${name}`.replace('use_use', 'use_'))
  const modulePath = `${appBasePath}/src/modules/${moduleName}`
  const fileFolderPath = `${modulePath}/hooks/${mutatedName}`
  const filePath = `${fileFolderPath}/${mutatedName}.tsx`
  const stub = geStub(StringUtil.toPascalCase(name))

  if (fs.existsSync(filePath)) {
    console.log(`${filePath} already exists`)
    return
  }

  createHookFolder(fileFolderPath)
  createFile(filePath, stub)
  publishInIndex(modulePath, mutatedName)

  return 0
}
