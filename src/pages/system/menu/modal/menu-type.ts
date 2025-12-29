// 基础菜单项接口
export interface MenuButtonItem {
  /** 唯一标识符，字符串类型 */
  id: string;
  /** 菜单/按钮名称 */
  name: string;
  /** 类型：menu（菜单）或 button（按钮） */
  type: 'menu' | 'button' | string;
  /** 父级菜单ID，顶级菜单可能为 null 或空字符串 */
  parent_id: string | null;
  /** 权限标识符 */
  permission: string;
  /** 排序序号 */
  sort_order: number;
  /** 是否可见：1-可见，0-隐藏 */
  visible: 0 | 1;
  /** 状态：1-启用，0-停用 */
  status: 0 | 1;
  /** 创建时间，ISO 8601 格式字符串 */
  created_at: string;
}

// 扩展类型：如果需要支持树形结构
export interface TreeMenuButtonItem extends MenuButtonItem {
  children?: TreeMenuButtonItem[];
}

// 可选：如果需要更严格的类型约束
type MenuType = 'menu' | 'button' | 'directory' | 'api';

interface MenuItem {
  id: string;
  name: string;
  type: MenuType;
  parent_id: string | null;
  permission: string;
  sort_order: number;
  visible: boolean;
  status: boolean;
  created_at: string;
  updated_at?: string; // 可选的更新时间字段
}