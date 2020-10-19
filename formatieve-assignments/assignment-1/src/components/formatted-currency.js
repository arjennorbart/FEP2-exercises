const styles = /* css */`
  :host {
    display: inline;
  }
`

const template = /* html */`
  <style>${styles}</style>
  <span data-value></span>
`

class FormattedCurrency extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this._value = undefined
  }

  set value(value) {
    this.setAttribute('value', value)
    this._value = value
  }

  get value() {
    return this._value
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'value':
        const value = `${Number(newValue)}`
        this._shadowRoot.querySelector('[data-value]').innerText = value.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.')
        this._value = value
    }
  }
}

window.customElements.define('formatted-currency', FormattedCurrency)