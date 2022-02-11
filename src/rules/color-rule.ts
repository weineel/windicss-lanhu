import { CssProperty, BaseRule } from '../css-transform'

export class ColorRule implements BaseRule {
  ruleConfig: Record<string, string> = {
    '#FFFFFF': 'white',
    '#000000': 'black',

    '#FBFCFF': 'blue-50',
    '#F5F6FF': 'blue-100',
    '#EFF1FF': 'blue-200',
    '#DEE2FF': 'blue-300',
    '#C6CDFF': 'blue-400',
    '#A5B1FF': 'blue-500',
    '#6C80FF': 'blue-600',
    '#5C72FF': 'blue-700',
    '#495BCC': 'blue-800',
    '#374499': 'blue-900',

    '#FBFDFB': 'green-50',
    '#F3FAF5': 'green-100',
    '#EBF6EF': 'green-200',
    '#D8EEE0': 'green-300',
    '#BAE1C8': 'green-400',
    '#93D0A9': 'green-500',
    '#4FB273': 'green-600',
    '#3CAA64': 'green-700',
    '#308850': 'green-800',
    '#24663C': 'green-900',

    '#FEFCFB': 'orange-50',
    '#FDF8F3': 'orange-100',
    '#FCF3EC': 'orange-200',
    '#FAE8D9': 'orange-300',
    '#F7D7BD': 'orange-400',
    '#F3C097': 'orange-500',
    '#EC9956': 'orange-600',
    '#EA8E43': 'orange-700',
    '#BB7135': 'orange-800',
    '#8C5528': 'orange-900',

    '#FEFBFB': 'red-50',
    '#FEF5F4': 'red-100',
    '#FDEEEE': 'red-200',
    '#FBDDDC': 'red-300',
    '#F9C4C2': 'red-400',
    '#F5A3A0': 'red-500',
    '#EF6964': 'red-600',
    '#EE5853': 'red-700',
    '#BE4642': 'red-800',
    '#8E3431': 'red-900',

    '#FCFCFD': 'zinc-50',
    '#F7F7F8': 'zinc-100',
    '#F2F2F4': 'zinc-200',
    '#ECECEF': 'zinc-300',
    '#E1E2E4': 'zinc-400',
    '#CECED3': 'zinc-500',
    '#B6B7BD': 'zinc-600',
    '#797A86': 'zinc-700',
    '#484A5A': 'zinc-800',
    '#0B0E23': 'zinc-900',
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
