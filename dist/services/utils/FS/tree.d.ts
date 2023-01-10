export interface TreeNode {
    name: string;
    children?: TreeNode[];
}
export declare function generateTree(path: string, depth?: number, maxDepth?: number): TreeNode[];
