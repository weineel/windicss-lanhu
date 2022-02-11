import { BorderRadiusNamedRule } from './border-radius-named-rule'
import { ColorRule } from './color-rule'
import { FontSizeRule } from './font-size-rule'
import { FontsWeightRule } from './font-weight-rule'
import { NumberRemRule } from './number-rem-rule'
import { SizeNamedRemRule } from './size-named-rem-rule'

/** 顺序执行 */
export const Rules = [
  new FontSizeRule(),
  new FontsWeightRule(),
  new ColorRule(),
  new SizeNamedRemRule(),
  new BorderRadiusNamedRule(),
  // 因为会对所有 rem 值转化，所以优先级最低，放在最后
  new NumberRemRule(),
]
