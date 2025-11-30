import { default as Default } from './variants/layout-default'
import { default as ParentView } from './variants/layout-parent-view'
import { default as InnerLink } from './variants/layout-inner-link'

export const layouts = {
  Default: Default,
  ParentView: ParentView,
  InnerLink: InnerLink,
}

export type LayoutType = keyof typeof layouts
