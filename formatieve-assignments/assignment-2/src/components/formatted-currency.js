import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class FormattedCurrency extends LitElement {
  static get properties() {
    return {
      value: { type: String, reflect: true }
    }
  }

  render() {
    return String(this.value || '').replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.')
  }
}

window.customElements.define('formatted-currency', FormattedCurrency)