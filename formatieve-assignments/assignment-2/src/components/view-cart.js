import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import getData from "../utils/get-data.js";
import cart from "../utils/cart.js";

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

class ViewCart extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      totalPrice: { type: Number, reflect: false },
      productsData: { type: Array },
    }
  }

  removeEmptyCategories = () => {
    this.productsData = this.productsData.filter(category => category.products.length > 0)
  }

  setTotalPrice = () => {
    let totalPrice = 0
    this.productsData.forEach(category => {
      category.products.forEach(product => totalPrice += product.price * product.quantity)
    })
    this.totalPrice = totalPrice
  }

  handleCartActionChange = ({ categoryIndex, id, quantity }) => {
    this.productsData[categoryIndex].products.map(product => {
      if (product.id === id) {
        product.quantity = quantity
      }
      return product
    })
    this.productsData = [...this.productsData]
  }

  handleDelete = ({ categoryIndex, id }) => {
    window.dispatchEvent(new CustomEvent('cart:remove', { detail: { id } }))
    this.productsData[categoryIndex].products = this.productsData[categoryIndex].products.filter(product => product.id !== id)
    this.productsData = [...this.productsData]
    this.removeEmptyCategories()
  }

  update(changedProps) {
    super.update(changedProps)
    if (changedProps.get('productsData')) {
      this.setTotalPrice()
    }
  }

  render() {
    return html`
      <h2>Cart</h2>
      <p>Total price: <formatted-currency .value="${this.totalPrice}"></formatted-currency></p>
      ${this.productsData.map((category, categoryIndex) => html`
        <fws-product-list list-title="${category.name}"">
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
                  categoryIndex,
                  id: product.id,
                  quantity: event.detail
                })}"
              ></counter-control>
              <fws-button @click="${event => this.handleDelete({ categoryIndex, id: product.id })}">Delete</fws-button>
            </fws-product>
          `)}
        </fws-product-list>
      `)}
    `
  }
}

window.customElements.define('view-cart', ViewCart)