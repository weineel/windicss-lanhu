export function exactTransformByConfig(source: string, config: Record<string, string>) {
  if (!source) return ''
  return source.replace(/[\d\.]+(rem)|(px)|(vw)|(%)|(ch)/, m => {
    return config[m] || m
  })
}

export function debounce(fn: Function, delay: number) {
  let timer: any
  return function(...args: any[]) {
    if (timer) clearTimeout(timer)
    // 使用箭头函数来处理this问题
    // @ts-ignore
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function waitLoaded(selector: string, cb: Function) {
  if (document.querySelectorAll(selector).length) {
      cb()
  } else {
    setTimeout(() => waitLoaded(selector, cb), 1000)
  }
}
