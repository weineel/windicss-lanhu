import { transform } from './css-transform'
import { debounce, waitLoaded } from './utils'

let isLockSelf = false
function lockSelf() {
  isLockSelf = true
  setTimeout(() => {
    isLockSelf = false
  }, 1000)
}

waitLoaded('.annotation_container_b', () => {
  document.querySelector('.annotation_container_b')?.addEventListener('DOMSubtreeModified', debounce(() => {
    if (isLockSelf) return
    let transformed = false
    let originSource: string
    // '<span class='right copy_code transform2windicss'>trigger</span>'
    const $trigger = document.createElement('span')
    $trigger.setAttribute('class', 'right copy_code transform2windicss')
    $trigger.innerHTML = 'trigger'
    document.querySelector('.code_detail .subtitle')?.appendChild($trigger)
    document.querySelector('.code_detail .subtitle .transform2windicss')?.addEventListener('click', () => {
      if (isLockSelf) return
      const $cssHtml = document.querySelector('code.language-css')
      if (!$cssHtml) return
      if (transformed) {
        $cssHtml.innerHTML = originSource
      } else {
        originSource = $cssHtml.innerHTML
        $cssHtml.innerHTML = transform(originSource)
      }
      transformed = !transformed
      lockSelf()
    })
    lockSelf()
  }, 1000), false)
})
