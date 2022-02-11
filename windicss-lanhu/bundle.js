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
          '#FDF2F8': 'pink-50',
          '#FCE7F3': 'pink-100',
          '#FBCFE8': 'pink-200',
          '#F9A8D4': 'pink-300',
          '#F472B6': 'pink-400',
          '#797A86': 'warm-gray-500',
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
