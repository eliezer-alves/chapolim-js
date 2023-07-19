const fs = require('fs')

const getCurrentFilenames = (path: string) => {
  let message = ''
  fs.readdirSync(path).forEach((file: string) => {
    message += `${file}\n`
  })

  return message
}

export function remove(appBasePath: string, name: string) {
  const moduleName = `${name}Module`.replace('ModuleModule', 'Module')
  const modulePath = `${appBasePath}/src/modules/${moduleName}`

  if (!fs.existsSync(modulePath)) {
    console.log(`${modulePath}: module not found`)
    return
  }

  const message = getCurrentFilenames(modulePath)
  fs.rm(
    modulePath,
    {
      recursive: true,
    },
    (error: any) => {
      if (error) {
        console.log(error)
      } else {
        console.log('\nRecursive: Directories Deleted!')
        console.log(message)
      }
    },
  )
}
