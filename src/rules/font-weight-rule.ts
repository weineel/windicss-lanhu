import { CssProperty, BaseRule } from '../css-transform'

export class FontsWeightRule implements BaseRule {
  ruleConfig: Record<string, string> = {
    '100': 'font-thin',
    '200': 'font-extralight',
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-extrabold',
    '900': 'font-black',
  }

  isMatched(cssProperty: CssProperty) {
    return 'font-weight' === cssProperty.property
  }

  transform(cssProperty: CssProperty) {
    const source = cssProperty.source
    if (!source) return ''
    return source.replace(/[\d]00/, m => {
      return this.ruleConfig[m] || m
    })
  }
}