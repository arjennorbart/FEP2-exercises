import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { connect } from 'https://cdn.skypack.dev/pwa-helpers@0.9.1/connect-mixin.js';
import store from '../store/index.js'

const styles = css`
  a {
    color: var(--text-color);
    text-decoration: none;
  }
`

class FWSCart extends connect(store)(LitElement) {
  static get styles() { return styles }

  static get properties() {
    return {
      total: { type: Number }
    }
  }

  stateChanged(state) {
    this.total = state.cart.length
  }

  render() {
    return html`
      <a href="/cart.html">Cart (${this.total})</a>
    `
  }
}

window.customElements.define('fws-cart', FWSCart)