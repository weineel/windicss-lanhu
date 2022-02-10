import { CssProperty, BaseRule } from '../css-transform'
import { exactTransformByConfig } from '../utils'

export class BorderRadiusNamedRule implements BaseRule {
  ruleConfig = {
    '0px': 'none',
    '0.125rem': 'sm',
    '0.25rem': 'default',
    '0.375rem': 'md',
    '0.5rem': 'lg',
    '0.75rem': 'xl',
    '1rem': '2xl',
    '1.5rem': '3xl',
    '2rem': '4xl',
    '50%': '1/2',
  }

  isMatched(cssProperty: CssProperty) {
    return ['border-radius'].includes(cssProperty.property)
  }

  transform(cssProperty: CssProperty) {
    return exactTransformByConfig(cssProperty.source, this.ruleConfig)
  }
}