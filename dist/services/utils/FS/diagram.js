"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDiagram = void 0;
const fs = __importStar(require("fs"));
const path_1 = require("path");
function generateDiagram(path, depth = 0, maxDepth = 2) {
    let diagram = '';
    if (depth > maxDepth) {
        return '';
    }
    if (depth === 0) {
        diagram += `📂 ${(0, path_1.basename)(path)}\n`;
        depth += 1;
    }
    const entries = fs.readdirSync(path, { withFileTypes: true });
    for (const entry of entries) {
        const name = entry.name;
        if (entry.isDirectory()) {
            diagram += `${'  '.repeat(depth)}📂 ${name}\n`;
            diagram += generateDiagram(`${path}/${name}`, depth + 1, maxDepth);
        }
        else {
            const ext = name.split('.').pop();
            diagram += `${'  '.repeat(depth)}📄 ${name}\n`;
        }
    }
    return diagram;
}
exports.generateDiagram = generateDiagram;
