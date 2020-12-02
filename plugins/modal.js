Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)

}

function noop () {

}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const  wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary' }`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close = 'true'>
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Window'}</span>
                ${options.closable ? `<span class="modal-close" data-close = 'true'>&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
               ${options.content || ''}
            </div>
        </div>
    </div>
`)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

/*Передать заголовок модального окна чтобы он передавался title : string
closable: boolean если true крестик показывается, если false то его нет
content: string динамический контент в формате html
width: string (400px) ширина модального окна
реализовать метод destroy(): void должен удалять $modal
При нажатии на креcтик модальное окно должно закрываться и при нажатии на пустое пространство модалка должна закрываться ( все с анимацией)
Публичный метод SetContent(html: string): void
Hooks - onClose(): void вызывается когда МО закрыто
onOpen(): void
beforeClose(): boolean | если true то МО можно закрыть false - не закрывается
animate css
 */

$.modal = function (options) {
    const $modal = _createModal(options)
    const animationSpeed = 200
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return  console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose
                }
            }, animationSpeed)
        }
    }

    const listener = event => {
        // console.log('clicked', event.target.dataset.close)
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener("click", listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}