const styles = /* css */`
  :host {
    display: inline-flex;
    align-items: center;
  }

  button {
    font-family: 'Fira Code', monospace;
  }
`

const template = /* html */`
  <style>${styles}</style>
  <button><slot></slot></button>
`

class FwsButton extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.button = this._shadowRoot.querySelector('button')
  }

  connectedCallback() {
    this.button.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.handleClick)
  }

  handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let event = new CustomEvent('click');
    this.dispatchEvent(event);
  }
}

window.customElements.define('fws-button', FwsButton)