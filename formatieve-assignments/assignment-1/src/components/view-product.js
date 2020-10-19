import getData from '../utils/get-data.js'
import cart from "../utils/cart.js";

const styles = /* css */`
  :host {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-double);
  }

  img {
    width: 8rem;
    height: 8rem;
  }

  h2 {
    font-family: 'Special Elite', cursive;
    margin: 0;
  }

  fws-button[data-hide="true"] {
    display: none;
  }
`

const template = /* html */`
  <style>${styles}</style>
  <img src="/assets/products/axes/rpg_icons89.png" />
  <div>
    <h2></h2>
    <p>Price: <formatted-currency></formatted-currency></p>
    <fws-button data-add-to-cart data-hide="true">Add to cart</fws-button>
    <fws-button data-remove-from-cart data-hide="true">Remove from cart</fws-button>
  </div>
`

class ViewProduct extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
  }

  displayCorrectCartButton = () => {
    const addToCartButton = this._shadowRoot.querySelector('[data-add-to-cart]')
    const removeFromCartButton = this._shadowRoot.querySelector('[data-remove-from-cart]')

    const inCart = cart.containsProductId({ id: this.getAttribute('id') })
    
    if (inCart) {
      addToCartButton.dataset.hide = 'true'
      removeFromCartButton.dataset.hide = 'false'
    } else {
      addToCartButton.dataset.hide = 'false'
      removeFromCartButton.dataset.hide = 'true'
    }
  }

  addToCartHandler = () => {
    const category = this.getAttribute('category')
    const id = this.getAttribute('id')
    const event = new CustomEvent('cart:add', { detail: { category, id } })
    window.dispatchEvent(event)

    this.displayCorrectCartButton()
  }

  removeFromCartHandler = () => {
    const id = this.getAttribute('id')
    const event = new CustomEvent('cart:remove', { detail: { id } })
    window.dispatchEvent(event)

    this.displayCorrectCartButton()
  }

  connectedCallback() {
    const category = this.getAttribute('category')
    const id = this.getAttribute('id')
    const addToCartButton = this._shadowRoot.querySelector('[data-add-to-cart]')
    const removeFromCartButton = this._shadowRoot.querySelector('[data-remove-from-cart]')

    addToCartButton.addEventListener('click', this.addToCartHandler)
    removeFromCartButton.addEventListener('click', this.removeFromCartHandler)

    getData(category)
      .then(data => data.products.find(product => product.id === id))
      .then(product => {
        if (product) {
          const image = this._shadowRoot.querySelector('img')
          const title = this._shadowRoot.querySelector('h2')
          const price = this._shadowRoot.querySelector('formatted-currency')

          image.src = `/assets/products/${category}/rpg_icons${product.id}.png`
          title.innerText = `${category} - Type ${product.type} (${product.variant})`
          price.value = product.price

          this.displayCorrectCartButton()
        }
      })
  }

  disconnectedCallback() {
    const addToCart = this._shadowRoot.querySelector('[data-add-to-cart]')
    addToCart.removeEventListener('click', this.addToCartHandler)
  }
}

window.customElements.define('view-product', ViewProduct)