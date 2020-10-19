import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { connect } from 'https://cdn.skypack.dev/pwa-helpers@0.9.1/connect-mixin.js';
import store from '../store/index.js'
import { add, remove, isProductInCart } from '../store/cart.js'
import { getProduct, getCategory } from '../store/products.js'

const styles = css`
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
`

class ViewProduct extends connect(store)(LitElement) {
  static get styles() { return styles }

  static get properties() {
    return {
      // Product properties
      id: { type: String, reflect: true },
      type: { type: String },
      price: { type: Number },
      variant: { type: String },

      category: { type: String, reflect: true },
      categoryName: { type: String },
      productInCart: { type: Boolean },
    }
  }

  addToCartHandler = () => {
    store.dispatch(add({ category: this.category, id: this.id }))
  }

  removeFromCartHandler = () => {
    store.dispatch(remove({ id: this.id }))
  }

  stateChanged(state) {
    const category = getCategory({ categoryId: this.category })
    const product = getProduct({ categoryId: this.category, id: this.id })
    if (category && product) {
      this.categoryName = category.name
      this.type = product.type
      this.variant = product.variant
      this.price = product.price
    }
    this.productInCart = isProductInCart({ id: this.id })
  }

  render() {
    return html`
      ${this.id && this.category && html`<img src="/assets/products/${this.category}/rpg_icons${this.id}.png" />`}
      <div>
        <h2>${this.categoryName} - Type ${this.type} (${this.variant})</h2>
        <p>Price: <formatted-currency .value="${this.price}"></formatted-currency></p>
        ${this.productInCart === false ? html`<fws-button @click="${this.addToCartHandler}">Add to cart</fws-button>` : ''}
        ${this.productInCart === true  ? html`<fws-button @click="${this.removeFromCartHandler}">Remove from cart</fws-button>` : ''}
      </div>
    `
  }
}

window.customElements.define('view-product', ViewProduct)