import { default as Default } from './presets/default'
import { default as ParentView } from './presets/parent-view'
import { default as InnerLink } from './presets/inner-link'

export const layouts = {
  Default: Default,
  ParentView: ParentView,
  InnerLink: InnerLink,
}

export type LayoutType = keyof typeof layouts
