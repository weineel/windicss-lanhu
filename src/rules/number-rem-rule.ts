import { CssProperty, BaseRule } from '../css-transform'

export class NumberRemRule implements BaseRule {
  isMatched(cssProperty: CssProperty) {
    return true
  }

  transform(cssProperty: CssProperty) {
    if (cssProperty.source) {
      // @ts-ignore
      const source = cssProperty.source.replace(/([\d\.]+)rem/, (m, g1) => {
        return Number(g1) / 0.25
      })
      return source
      // TODO: 百分比小数转分数
      // return source.replace(/([\d\.]?)%/, (m, g1) => {
      //   return g1 / 0.25
      // })
    }
    return ''
  }
}
