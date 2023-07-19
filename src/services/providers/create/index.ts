const fs = require('fs')

const PROVIDER_STUB = fs.readFileSync(`${__dirname}/stubs/provider.stub`, 'utf8')
const PROVIDER_INDEX_STUB = fs.readFileSync(`${__dirname}/stubs/provider-index.stub`, 'utf8')

function geStub(name: string) {
  return PROVIDER_STUB.replaceAll('$name', name)
}

function geIndexStub(name: string) {
  return PROVIDER_INDEX_STUB.replaceAll('$name', name)
}

function createProviderFolder(folderPath: string) {
  fs.mkdirSync(folderPath, { recursive: true })
}

const createFile = (filePath: string, stub: string) => {
  fs.writeFileSync(filePath, stub)
  console.log('Provider file: ' + filePath)
}

const createIndexProvider = (modulePath: string, name: string) => {
  const stub = geIndexStub(name)
  const filePath = `${modulePath}/providers/index.tsx`
  if (fs.existsSync(filePath)) {
    console.log(`${filePath}: already exists`)
    return
  }

  return createFile(filePath, stub)
}

export function create(appBasePath: string, moduleName: string, name: string, createIndex = false) {
  moduleName = `${moduleName}Module`.replace('ModuleModule', 'Module')
  const mutatedName = `${name}Provider`.replace('ProviderProvider', 'Provider')
  const modulePath = `${appBasePath}/src/modules/${moduleName}`
  const fileFolderPath = `${modulePath}/providers/${mutatedName}`
  const filePath = `${fileFolderPath}/${mutatedName}.tsx`
  const stub = geStub(name)

  if (fs.existsSync(filePath)) {
    console.log(`${filePath} already exists`)
    return
  }

  createProviderFolder(fileFolderPath)
  createFile(filePath, stub)

  if (createIndex) {
    createIndexProvider(modulePath, mutatedName)
  }

  return 0
}
