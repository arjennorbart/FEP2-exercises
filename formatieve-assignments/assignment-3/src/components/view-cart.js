import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { connect } from 'https://cdn.skypack.dev/pwa-helpers@0.9.1/connect-mixin.js';
import store from '../store/index.js'
import { remove as removeFromCart, setQuantity, getProducts, getTotalPrice } from '../store/cart.js'
import { removeProduct } from '../store/products.js'

const styles = css`
  :host {
    display: block;
  }

  .total-product-price {
    display: inline-flex;
    align-items: center;
    padding-left: var(--spacing-half);
    padding-right: var(--spacing-half);
  }

  h2 {
    font-family: 'Special Elite', cursive;
  }

  fws-product-list {
    margin-bottom: var(--spacing-default);
  }
`

class ViewCart extends connect(store)(LitElement) {
  static get styles() { return styles }

  static get properties() {
    return {
      totalPrice: { type: Number, reflect: false },
      productsData: { type: Array },
    }
  }

  handleCartActionChange = ({ id, quantity }) => {
    store.dispatch(setQuantity({ id, quantity }))
  }

  handleDelete = ({ id }) => {
    store.dispatch(removeProduct({ id }))
    store.dispatch(removeFromCart({ id }))
  }

  stateChanged(state) {
    this.totalPrice = getTotalPrice()
    this.productsData = getProducts()
  }

  render() {
    return html`
      <h2>Cart</h2>
      <p>Total price: <formatted-currency value="${this.totalPrice || 0}"></formatted-currency></p>
      ${this.productsData.map(category => html`
        <fws-product-list list-title="${category.name}">
          ${category.products.map(product => html`
            <fws-product
              category="${category.id}"
              id="${product.id}"
              type="${product.type}"
              variant="${product.variant}"
              price="${product.price}"
            >
              <span class="total-product-price">
                (total: <formatted-currency value="${product.quantity * product.price}"></formatted-currency>)
              </span>
              <counter-control
                .value="${product.quantity}"
                @change="${event => this.handleCartActionChange({
                  id: product.id,
                  quantity: event.detail
                })}"
              ></counter-control>
              <fws-button @click="${event => this.handleDelete({ id: product.id})}">Delete</fws-button>
            </fws-product>
          `)}
        </fws-product-list>
      `)}
    `
  }
}

window.customElements.define('view-cart', ViewCart)