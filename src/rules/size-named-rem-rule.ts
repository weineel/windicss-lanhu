import { CssProperty, BaseRule } from '../css-transform'
import { exactTransformByConfig } from '../utils'

const SizeProperties = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height']

export class SizeNamedRemRule implements BaseRule {
  ruleConfig = {
    '100%': 'full',
    '100vw': 'screen',
    '65ch': 'prose',
    '20rem': 'xs',
    '24rem': 'sm',
    '28rem': 'md',
    '32rem': 'lg',
    '36rem': 'xl',
    '42rem': '2xl',
    '48rem': '3xl',
    '640px': 'screen-sm',
    '768px': 'screen-md',
    '1024px': 'screen-lg',
    '1280px': 'screen-xl',
    '1536px': 'screen-2xl',
  }

  isMatched(cssProperty: CssProperty) {
    return SizeProperties.includes(cssProperty.property)
  }

  transform(cssProperty: CssProperty) {
    return exactTransformByConfig(cssProperty.source, this.ruleConfig)
  }
}