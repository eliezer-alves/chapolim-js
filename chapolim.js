const chapolim = require('../dist/index.js')
const { Command } = require('commander')
const program = new Command()

program
  .name('chapolim')
  .description('CLI to assist you in application development')
  .version('0.1.0')

program
  .command('make:module')
  .description('create a module in the application')
  .argument('<name>', 'module name')
  .option('-r, --routes', 'create the module with a routes file')
  .option('-v, --views', 'creates the module with an example view')
  .option('-p, --providers', 'creates the module with an example provider')
  .action((name, options) => {
    chapolim.Modules.create(__dirname, name, options.routes, options.views, options.providers)
  })

program
  .command('list:module')
  .description('list application modules')
  .action(() => {
    const modules = chapolim.Modules.list(__dirname)
    modules.map(module => console.log(module))
  })

program
  .command('show:module')
  .description('shows the structure of the application modules')
  .argument('<name>', 'module name')
  .action(name => {
    console.log(chapolim.Modules.showDiagram(__dirname, name))
  })

program
  .command('delete:module')
  .description('delete a module')
  .argument('<name>', 'module name')
  .action(name => {
    chapolim.Modules.remove(__dirname, name)
  })

program
  .command('make:provider')
  .description('creates a new provider in the specified module')
  .argument('<name>', 'provider name')
  .requiredOption('-m, --module <name>', 'module where the provider will be created')
  .option('-u, --hook', 'create custom hook for using provider context')
  .action((name, options) => {
    chapolim.Providers.create(__dirname, options.module, name, options.hook)
  })

program.parse()
