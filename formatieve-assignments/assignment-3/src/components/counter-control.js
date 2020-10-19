import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
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

class CounterControl extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      value: { type: Number, reflect: false },
    }
  }

  updated = (updatedProps) => {
    if (updatedProps.has('value')) {
      const event = new CustomEvent('change', { detail: this.value })
      this.dispatchEvent(event)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.value = this.getAttribute('value') || 1
  }

  handleDecrease = () => {
    if (this.value >= 1) {
      this.value -= 1
    }
  }

  handleIncrease = () => {
    this.value++
  }

  handleReset = () => {
    this.value = this.getAttribute('value') || 1
  }

  render() {
    return html`
      <span>
        <button @click="${this.handleDecrease}">-</button>
        <input type="number" min="0" value="${this.value}">
        <button @click="${this.handleIncrease}">+</button>
      </span>
      <button @click="${this.handleReset}">Reset</button>
    `
  }
}

window.customElements.define('counter-control', CounterControl)