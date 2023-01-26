"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.showDiagram = void 0;
const utils_1 = require("../../utils");
function showDiagram(appBasePath, name) {
    const modulePath = `${appBasePath}/src/modules/${name}`;
    return utils_1.FS.generateDiagram(modulePath, 0, 2);
}
exports.showDiagram = showDiagram;
function show(appBasePath, name) {
    const modulePath = `${appBasePath}/src/modules/${name}`;
    const tree = utils_1.FS.generateTree(modulePath, 0, 10);
    if (!tree.length)
        return null;
    return {
        name,
        children: tree,
    };
}
exports.show = show;
