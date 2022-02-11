(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function exactTransformByConfig(source, config) {
      if (!source)
          return '';
      return source.replace(/[\d\.]+(rem)|(px)|(vw)|(%)|(ch)/, m => {
          return config[m] || m;
      });
  }
  function debounce(fn, delay) {
      let timer;
      return function (...args) {
          if (timer)
              clearTimeout(timer);
          // 使用箭头函数来处理this问题
          // @ts-ignore
          timer = setTimeout(() => fn.apply(this, args), delay);
      };
  }
  function waitLoaded(selector, cb) {
      if (document.querySelectorAll(selector).length) {
          cb();
      }
      else {
          setTimeout(() => waitLoaded(selector, cb), 1000);
      }
  }

  class BorderRadiusNamedRule {
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
      };
      isMatched(cssProperty) {
          return ['border-radius'].includes(cssProperty.property);
      }
      transform(cssProperty) {
          return exactTransformByConfig(cssProperty.source, this.ruleConfig);
      }
  }

  class ColorRule {
      ruleConfig = {
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
      };
      isMatched(cssProperty) {
          return ['color', 'border-color', 'border'].includes(cssProperty.property);
      }
      transform(cssProperty) {
          if (cssProperty.source) {
              return cssProperty.source.replace(/#[ABCDEF\d]{6}/, m => {
                  return this.ruleConfig[m] || this.ruleConfig[m.toLowerCase()] || m;
              });
          }
          return '';
      }
  }

  class FontSizeRule {
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
      };
      isMatched(cssProperty) {
          return ['font-size'].includes(cssProperty.property);
      }
      transform(cssProperty) {
          return exactTransformByConfig(cssProperty.source, this.ruleConfig);
      }
  }

  class FontsWeightRule {
      ruleConfig = {
          '100': 'font-thin',
          '200': 'font-extralight',
          '300': 'font-light',
          '400': 'font-normal',
          '500': 'font-medium',
          '600': 'font-semibold',
          '700': 'font-bold',
          '800': 'font-extrabold',
          '900': 'font-black',
      };
      isMatched(cssProperty) {
          return 'font-weight' === cssProperty.property;
      }
      transform(cssProperty) {
          const source = cssProperty.source;
          if (!source)
              return '';
          return source.replace(/[\d]00/, m => {
              return this.ruleConfig[m] || m;
          });
      }
  }

  class NumberRemRule {
      isMatched(cssProperty) {
          return true;
      }
      transform(cssProperty) {
          if (cssProperty.source) {
              // @ts-ignore
              const source = cssProperty.source.replace(/([\d\.]+)rem/, (m, g1) => {
                  return Number(g1) / 0.25;
              });
              return source;
              // TODO: 百分比小数转分数
              // return source.replace(/([\d\.]?)%/, (m, g1) => {
              //   return g1 / 0.25
              // })
          }
          return '';
      }
  }

  const SizeProperties = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'];
  class SizeNamedRemRule {
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
      };
      isMatched(cssProperty) {
          return SizeProperties.includes(cssProperty.property);
      }
      transform(cssProperty) {
          return exactTransformByConfig(cssProperty.source, this.ruleConfig);
      }
  }

  /** 顺序执行 */
  const Rules = [
      new FontSizeRule(),
      new FontsWeightRule(),
      new ColorRule(),
      new SizeNamedRemRule(),
      new BorderRadiusNamedRule(),
      // 因为会对所有 rem 值转化，所以优先级最低，放在最后
      new NumberRemRule(),
  ];

  // <span class="token punctuation">;</span>\n 行拆分
  const Separator = '<span class="token punctuation">;</span>\n';
  /** 单个 CSS 属性 */
  // <span class="token property">width</span><span class="token punctuation">:</span> 7.63rem<span class="token punctuation">;\n
  class CssProperty {
      source;
      property = '';
      rules;
      constructor(source) {
          this.source = `${source}${Separator}`;
          const matched = this.source.match(/\<span class="token property"\>([\w-]+)\<\/span\>/);
          if (matched) {
              this.property = matched[1];
          }
          this.rules = Rules.filter(rule => rule.isMatched(this));
      }
      transform() {
          this.rules.forEach(rule => {
              this.source = rule.transform(this);
          });
      }
  }
  function transform(cssHtml) {
      // parser
      const cssPropertyList = cssHtml.split(Separator).filter(e => e).map(e => new CssProperty(e));
      // transform
      cssPropertyList.forEach(cssProperty => {
          cssProperty.transform();
      });
      const rt = cssPropertyList.map(e => e.source).join('');
      return rt;
  }

  let isLockSelf = false;
  function lockSelf() {
      isLockSelf = true;
      setTimeout(() => {
          isLockSelf = false;
      }, 1000);
  }
  waitLoaded('.annotation_container_b', () => {
      document.querySelector('.annotation_container_b')?.addEventListener('DOMSubtreeModified', debounce(() => {
          if (isLockSelf)
              return;
          let transformed = false;
          let originSource;
          // '<span class='right copy_code transform2windicss'>trigger</span>'
          const $trigger = document.createElement('span');
          $trigger.setAttribute('class', 'right copy_code transform2windicss');
          $trigger.innerHTML = 'trigger';
          document.querySelector('.code_detail .subtitle')?.appendChild($trigger);
          document.querySelector('.code_detail .subtitle .transform2windicss')?.addEventListener('click', () => {
              if (isLockSelf)
                  return;
              const $cssHtml = document.querySelector('code.language-css');
              if (!$cssHtml)
                  return;
              if (transformed) {
                  $cssHtml.innerHTML = originSource;
              }
              else {
                  originSource = $cssHtml.innerHTML;
                  $cssHtml.innerHTML = transform(originSource);
              }
              transformed = !transformed;
              lockSelf();
          });
          lockSelf();
      }, 1000), false);
  });

}));
