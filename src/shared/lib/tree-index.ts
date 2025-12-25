
// 基础树节点类型（可扩展）
export interface TreeNode<T = any> {
  id: string | number;
  children?: TreeNode<T>[];
  [key: string]: any; // 允许其他属性
}

// 索引映射表类型
export type TreeMap = Map<string | number, TreeNode>;

type TreeMapOptions = { keyField?: string, childrenField?: string }

// 查找结果类型
type FindResult<T = any> = TreeNode<T> | null;

/**
 * 创建树索引（纯函数式）
 * @param tree 树形数据
 * @returns 索引映射表
 */
export function createTreeMap(tree: TreeNode | TreeNode[], options?: TreeMapOptions): TreeMap {
  const treeMap: TreeMap = new Map()
  const { keyField, childrenField } = Object.assign({ keyField: 'id', childrenField: 'children' }, options ?? {})
  
  // 递归构建索引
  function buildIndex(node: TreeNode): void {
    treeMap.set(node[keyField], node);
    
    if (node[childrenField] && node[childrenField].length > 0) {
      node[childrenField].forEach(buildIndex);
    }
  }
  
  Array.isArray(tree) ? tree.forEach(buildIndex) : buildIndex(tree);
  return treeMap;
}

/**
 * 查找节点（纯函数）
 * @param treeMap 索引映射表
 * @param id 要查找的id
 * @returns 找到的节点或null
 */
export function findNodeById(treeMap: TreeMap, id: string | number): FindResult {
  return treeMap.get(id) || null;
}

// 使用示例
// const treeMap = createTreeMap(treeData);
// const node = findNodeById(treeMap, 'some-id');