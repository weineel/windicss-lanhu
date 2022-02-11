import { CssProperty, BaseRule } from '../css-transform'
import { exactTransformByConfig } from '../utils'

export class FontSizeRule implements BaseRule {
  ruleConfig = {
    // 蓝湖只保留两位有效数字，四舍五入。
    '0.75rem': 'text-xs',
    // '0.875rem': 'text-sm',
    '0.88rem': 'text-sm',
    '1rem': 'text-base',
    // '1.125rem': 'text-lg',
    '1.13rem': 'text-lg',
    '1.25rem': 'text-xl',
    '1.5rem': 'text-2xl',
    // '1.875rem': 'text-3xl',
    '1.88rem': 'text-3xl',
    '2.25rem': 'text-4xl',
    '3rem': 'text-5xl',
    '3.75rem': 'text-6xl',
    '4.5rem': 'text-7xl',
    '6rem': 'text-8xl',
  }

  isMatched(cssProperty: CssProperty) {
    return ['font-size'].includes(cssProperty.property)
  }

  transform(cssProperty: CssProperty) {
    return exactTransformByConfig(cssProperty.source, this.ruleConfig)
  }
}