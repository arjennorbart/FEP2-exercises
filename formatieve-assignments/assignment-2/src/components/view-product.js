import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import getData from '../utils/get-data.js'
import cart from "../utils/cart.js";

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

class ViewProduct extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      // Product properties
      id: { type: String, reflect: true },
      type: { type: String, reflect: true },
      price: { type: Number, reflect: true },
      variant: { type: String, reflect: true },

      category: { type: String, reflect: true },
      categoryName: { type: String, reflect: true },
      productInCart: { type: Boolean, reflect: true },
    }
  }

  addToCartHandler = () => {
    const event = new CustomEvent('cart:add', { detail: { category: this.category, id: this.id } })
    window.dispatchEvent(event)
    this.productInCart = true
  }

  removeFromCartHandler = () => {
    const event = new CustomEvent('cart:remove', { detail: { id: this.id } })
    window.dispatchEvent(event)
    this.productInCart = false
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