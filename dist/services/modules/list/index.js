"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const fs = require('fs');
function list(appBasePath) {
    const modulesPath = `${appBasePath}/src/modules`;
    const entries = fs.readdirSync(modulesPath, { withFileTypes: true });
    return entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
}
exports.list = list;
