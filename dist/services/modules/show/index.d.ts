import { FS } from '../../utils';
type showResult = {
    name: string;
    children: FS.TreeNode[];
} | null;
export declare function showDiagram(appBasePath: string, name: string): string;
export declare function show(appBasePath: string, name: string): showResult;
export {};
