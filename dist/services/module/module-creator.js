"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeModule = void 0;
const fs = require('fs');
const config = {
    basePath: `${__dirname}\\src`,
    modulesPath: `${__dirname}\\src\\modules`,
};
const MODULE_STUB = fs.readFileSync(`${__dirname}\\stubs\\module.stub`, 'utf8');
const MODULE_WITH_ROUTE_STUB = fs.readFileSync(`${__dirname}\\stubs\\module-with-route.stub`, 'utf8');
const ROUTE_STUB = fs.readFileSync(`${__dirname}\\stubs\\route.stub`, 'utf8');
function makeRouteFileName(moduleName) {
    return `${moduleName}Router`.replace('ModuleRouter', 'Router');
}
function getModuleStub(moduleName, withRouteFile) {
    if (withRouteFile) {
        const routFileName = makeRouteFileName(moduleName);
        return MODULE_WITH_ROUTE_STUB.replaceAll('$moduleName', moduleName).replaceAll('$RouteFile', routFileName);
    }
    return MODULE_STUB.replaceAll('$moduleName', moduleName);
}
const getRouteStub = (moduleName) => {
    const routeFileName = makeRouteFileName(moduleName);
    return ROUTE_STUB.replaceAll('$routeFile', routeFileName).replaceAll('$moduleName', moduleName);
};
const makeRoutes = (moduleName, modulePath) => {
    const routeFileName = makeRouteFileName(moduleName);
    const routerPath = `${modulePath}\\router`;
    const routerFilePath = `${routerPath}\\${routeFileName}.tsx`;
    const stub = getRouteStub(moduleName);
    if (!fs.existsSync(routerPath)) {
        fs.mkdirSync(routerPath);
    }
    fs.writeFileSync(routerFilePath, stub);
    console.log(`Route file: ${routerFilePath}`);
};
function createModuleFolder(modulePath) {
    fs.mkdirSync(modulePath);
}
function createViewsFolder(modulePath) {
    fs.mkdirSync(modulePath + '/views');
}
const createFileModule = (filePath, stub) => {
    fs.writeFileSync(filePath, stub);
    console.log('Module file: ' + filePath);
};
function makeModule(name, withRoutes = false, withViews = false) {
    const moduleName = `${name}Module`.replace('ModuleModule', 'Module');
    const modulePath = `${config.modulesPath}\\${moduleName}`;
    const filePath = `${modulePath}\\${moduleName}.tsx`;
    const stub = getModuleStub(moduleName, withRoutes);
    if (fs.existsSync(modulePath)) {
        console.log(`${modulePath} already exists`);
        return;
    }
    createModuleFolder(modulePath);
    if (withViews)
        createViewsFolder(modulePath);
    if (withRoutes)
        makeRoutes(moduleName, modulePath);
    createFileModule(filePath, stub);
    return 0;
}
exports.makeModule = makeModule;
