import { Rules } from './rules'

// <span class="token punctuation">;</span>\n 行拆分
export const Separator = '<span class="token punctuation">;</span>\n'

/** 单个 CSS 属性 */
// <span class="token property">width</span><span class="token punctuation">:</span> 7.63rem<span class="token punctuation">;\n
export class CssProperty {
  source: string

  property: string = ''

  rules: BaseRule[]

  constructor(source: string) {
    this.source = `${source}${Separator}`
    const matched = this.source.match(/\<span class="token property"\>([\w-]+)\<\/span\>/)
    if (matched) {
      this.property = matched[1]
    }
    this.rules = Rules.filter(rule => rule.isMatched(this))
  }

  transform() {
    this.rules.forEach(rule => {
      this.source = rule.transform(this)
    })
  }
}

/** 所有的 rule 都要实现下面的接口 */
export interface BaseRule {
  /** 是否匹配到此规则 */
  isMatched(cssProperty: CssProperty): boolean

  /** 执行当前规则的转换逻辑 */
  transform(cssProperty: CssProperty): string
}

export function transform(cssHtml: string) {
  // parser
  const cssPropertyList = cssHtml.split(Separator).filter(e => e).map(e => new CssProperty(e))

  // transform
  cssPropertyList.forEach(cssProperty => {
    cssProperty.transform()
  })
  const rt = cssPropertyList.map(e => e.source).join('')
  return rt
}
