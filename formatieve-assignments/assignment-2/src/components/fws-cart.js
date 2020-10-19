import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import cart from '../utils/cart.js'

const styles = css`
  a {
    color: var(--text-color);
    text-decoration: none;
  }
`

class FWSCart extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      total: { type: Number }
    }
  }

  constructor() {
    super()
    this.total = cart.totalProducts()
  }

  addToCartHandler = (event) => {
    const { category, id } = event.detail
    cart.add({ category, id })
    this.total = cart.totalProducts()
  }

  removeFromCartHandler = (event) => {
    const { id } = event.detail
    cart.remove({ id })
    this.total = cart.totalProducts()
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('cart:add', this.addToCartHandler)
    window.addEventListener('cart:remove', this.removeFromCartHandler)
  }

  disconnectedCallback() {
    window.removeEventListener('cart:add', this.addToCartHandler)
    window.removeEventListener('cart:remove', this.removeFromCartHandler)
    super.disconnectedCallback()
  }

  render() {
    return html`
      <a href="/cart.html">Cart (${this.total})</a>
    `
  }
}

window.customElements.define('fws-cart', FWSCart)