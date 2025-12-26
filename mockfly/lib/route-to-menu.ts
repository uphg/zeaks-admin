import { routeData } from "../common.ts";

// 定义路由数据接口
interface RouteMeta {
  title: string;
  icon: string;
  [key: string]: any;
}

interface RouteRecord {
  path: string;
  component: string;
  meta?: RouteMeta;
  mergeSingleChild?: boolean;
  children?: RouteRecord[];
  [key: string]: any;
}

// 定义菜单数据接口（包含 children 层级）
interface MenuItem {
  id: string;
  type: 'directory' | 'menu';
  title: string;
  icon: string;
  parent_id: string;
  path: string;
  permission: string;
  sort_order: number;
  visible: number;
  status: number;
  children?: MenuItem[];
  [key: string]: any;
}

// 转换选项接口
interface TransformOptions {
  parentId?: string;
  startId?: number;
  defaultPermission?: (route: RouteRecord) => string;
  defaultSortOrder?: number;
  defaultVisible?: number;
  defaultStatus?: number;
}

/**
 * 将路由数据转换为菜单数据（保留树形层级）
 */
function transformRoutesToMenu(
  routes: RouteRecord[], 
  options: TransformOptions = {}
): MenuItem[] {
  const {
    parentId = '0',
    startId = 1,
    defaultPermission = (route: RouteRecord) => {
      const path = route.path.startsWith('/') ? route.path.slice(1) : route.path;
      const normalizedPath = path.replace(/\//g, ':');
      return normalizedPath ? `${normalizedPath}:view` : 'dashboard:view';
    },
    defaultSortOrder = 1,
    defaultVisible = 1,
    defaultStatus = 1
  } = options;

  let idCounter: number = startId;

  /**
   * 递归处理路由，返回包含 children 的菜单项
   */
  const processRoute = (
    route: RouteRecord,
    currentParentId: string,
    depth: number,
    index: number
  ): MenuItem => {
    const currentId: string = idCounter.toString();
    idCounter++;

    let targetRoute = route;
    let childrenRoutes: RouteRecord[] | null | undefined = route.children;
    let isMerged = false;

    // // 检查是否需要合并单子节点
    if (route.mergeSingleChild && route.children?.length) {
      targetRoute = Object.assign({},  route.children[0], {
        path: [route.path, route.children[0].path].join('/')
      })
      childrenRoutes = null; // 合并后不再有子节点
      isMerged = true;
    }

    // 创建当前菜单项
    const menuItem: MenuItem = {
      id: currentId,
      type: childrenRoutes && !isMerged ? 'directory' : 'menu',
      title: targetRoute.meta?.title || '',
      icon: targetRoute.meta?.icon || '',
      parent_id: currentParentId,
      path: targetRoute.path,
      permission: defaultPermission(targetRoute),
      sort_order: defaultSortOrder * depth + index,
      visible: defaultVisible,
      status: defaultStatus
    };

    // 处理子路由
    if (childrenRoutes && !isMerged) {
      const children: MenuItem[] = [];
      childrenRoutes.forEach((childRoute, childIndex) => {
        const childMenuItem = processRoute(childRoute, currentId, depth + 1, childIndex);
        children.push(childMenuItem);
      });
      // 按 sort_order 排序
      children.sort((a, b) => a.sort_order - b.sort_order);
      menuItem.children = children;
    }

    return menuItem;
  };

  // 处理所有顶级路由
  const menus: MenuItem[] = [];
  routes.forEach((route, index) => {
    const newRoute = Object.assign({}, route)
    const menuItem = processRoute(newRoute, parentId, 1, index);
    menus.push(menuItem);
  });

  // 按 sort_order 排序顶级菜单
  menus.sort((a, b) => a.sort_order - b.sort_order);
  
  return menus;
}

export function responseMenus() {
  const menus = transformRoutesToMenu(routeData)
  return () => menus
}
