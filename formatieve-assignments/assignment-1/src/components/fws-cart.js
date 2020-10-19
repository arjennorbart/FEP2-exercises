import cart from '../utils/cart.js'

const styles = /* css */`
  a {
    color: var(--text-color);
    text-decoration: none;
  }
`

const template = /* html */`
  <style>${styles}</style>
  <a href="/cart.html">Cart (<span data-total></span>)</a>
`

class FWSCart extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.totalProductsElement = this._shadowRoot.querySelector('[data-total]')
  }

  updateTotalProducts = () => {
    this.totalProductsElement.innerText = cart.totalProducts()
  }

  addToCartHandler = (event) => {
    const { category, id } = event.detail
    cart.add({ category, id })
    this.updateTotalProducts()
  }

  removeFromCartHandler = (event) => {
    const { id } = event.detail
    cart.remove({ id })
    this.updateTotalProducts()
  }

  connectedCallback() {
    this.updateTotalProducts()

    window.addEventListener('cart:add', this.addToCartHandler)
    window.addEventListener('cart:remove', this.removeFromCartHandler)
  }

  disconnectedCallback() {
    window.removeEventListener('cart:add', this.addToCartHandler)
    window.removeEventListener('cart:remove', this.removeFromCartHandler)
  }
}

window.customElements.define('fws-cart', FWSCart)