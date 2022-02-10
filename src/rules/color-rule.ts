import { CssProperty, BaseRule } from '../css-transform'

export class ColorRule implements BaseRule {
  ruleConfig: Record<string, string> = {
    '#FDF2F8': 'pink-50',
    '#FCE7F3': 'pink-100',
    '#FBCFE8': 'pink-200',
    '#F9A8D4': 'pink-300',
    '#F472B6': 'pink-400',
    '#797A86': 'warm-gray-500',
  }

  isMatched(cssProperty: CssProperty) {
    return ['color', 'border-color', 'border'].includes(cssProperty.property)
  }

  transform(cssProperty: CssProperty) {
    if (cssProperty.source) {
      return cssProperty.source.replace(/#[ABCDEF\d]{6}/, m => {
        return this.ruleConfig[m] || this.ruleConfig[m.toLowerCase()] || m
      })
    }
    return ''
  }
}
