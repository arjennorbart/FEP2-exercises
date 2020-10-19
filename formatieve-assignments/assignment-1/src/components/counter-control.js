const styles = /* css */`
  :host {
    display: inline-flex;
    align-items: center;
  }

  input {
    max-width: 2rem;
  }

  button {
    font-family: 'Fira Code', monospace;
  }
`

const template = /* html */`
  <style>${styles}</style>
  <span>
    <fws-button data-decrease>-</fws-button>
    <input  data-value type="number" min="0" value="1">
    <fws-button data-increase>+</fws-button>
  </span>
  <fws-button data-reset>Reset</fws-button>
  `

class CartActions extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.decreaseButton = this._shadowRoot.querySelector('[data-decrease]')
    this.valueInput = this._shadowRoot.querySelector('[data-value]')
    this.increaseButton = this._shadowRoot.querySelector('[data-increase]')
    this.resetButton = this._shadowRoot.querySelector('[data-reset]')
  }

  set value(value) {
    this.valueInput.value = value
  }

  get value() {
    return Number(this.valueInput.value)
  }

  emitChange = () => {
    const event = new CustomEvent('change', { detail: { target: this } })
    this.dispatchEvent(event)
  }

  handleDecrease = () => {
    if (this.value >= 1) {
      this.value--
      this.emitChange()
    }
  }

  handleIncrease = () => {
    this.value++
    this.emitChange()
  }

  handleReset = () => {
    this.value = this.getAttribute('value') || this.valueInput.getAttribute(value)
    this.emitChange()
  }

  connectedCallback() {
    this.decreaseButton.addEventListener('click', this.handleDecrease)
    this.increaseButton.addEventListener('click', this.handleIncrease)
    this.resetButton.addEventListener('click', this.handleReset)

    this.valueInput.value = this.getAttribute('value') || 1
  }

  disconnectedCallback() {
    this.decreaseButton.removeEventListener('click', this.handleDecrease)
    this.increaseButton.removeEventListener('click', this.handleIncrease)
    this.resetButton.removeEventListener('click', this.handleReset)
  }
}

window.customElements.define('counter-control', CartActions)