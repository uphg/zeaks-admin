export const layouts = {
  Default: () => import('@/shared/ui/layouts/presets/default'),
  ParentView: () => import('@/shared/ui/layouts/presets/parent-view'),
  InnerLink: () => import('@/shared/ui/layouts/presets/inner-link'),
}

export type LayoutType = keyof typeof layouts
