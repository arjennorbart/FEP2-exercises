import getData from "../utils/get-data.js";
import cart from "../utils/cart.js";

const styles = /* css */`
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

const template = /* html */`
  <style>${styles}</style>
  <h2>Cart</h2>
  <p>Total price: <formatted-currency></formatted-currency></p>
`

const sum = list => {
  let total = 0
  list.forEach(value => total = total + value)
  return total
}

class ViewCart extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.totalPriceElement = this._shadowRoot.querySelector('formatted-currency')
  }

  handleCartActionChange = (event) => {
    const target = event.detail.target
    const parent = target.parentNode
    const totalProductPrice = parent.querySelector('.total-product-price')
    totalProductPrice.innerHTML = `(total:&nbsp;<formatted-currency value="${ target.value * parent.getAttribute('price') }"></formatted-currency>)`
    this.updateTotalPrice()
  }

  handleDelete = (event) => {
    const product = event.target.parentNode
    const list = product.parentNode
    const id = product.getAttribute('id')
    cart.remove({ id })
    product.parentNode.removeChild(product)
    window.dispatchEvent(new CustomEvent('cart:remove', { detail: { id } }))

    if (list.childNodes.length === 0) {
      list.parentNode.removeChild(list)
    }

    this.updateTotalPrice()
  }

  updateTotalPrice = () => {
    const list = [...this._shadowRoot.querySelectorAll('fws-product')]
      .map(element => {
        const price = Number(element.getAttribute('price') || 0)
        const quantity = element.querySelector('counter-control').value
        return price * quantity
      })
    this.totalPriceElement.value = sum(list)
  }

  connectedCallback() {
    const categories = new Set()
    const productsInCart = cart.getProducts()
    const idsInCart = productsInCart.map(product => product.id)
    
    productsInCart.forEach(product => categories.add(product.category))
    
    categories.forEach(async category => {
      const {
        id: categoryId,
        name: categoryName,
        products: productsInCategory
      } = await getData(category)

      const categoryProductsInCart = productsInCategory.filter(product => idsInCart.includes(product.id))

      const list = document.createElement('fws-product-list')
      list.setAttribute('category-name', categoryName)

      categoryProductsInCart.forEach((product, index) => {
        const { quantity = 0 } = productsInCart.find(cartProduct => cartProduct.id === product.id)
        const productElement = document.createElement('fws-product')
        const counterControl = document.createElement('counter-control')
        const deleteButton = document.createElement('fws-button')
        const totalProductPrice = document.createElement('span')

        counterControl.setAttribute('value', quantity)
        counterControl.addEventListener('change', this.handleCartActionChange)
        deleteButton.addEventListener('click', this.handleDelete)

        totalProductPrice.classList.add('total-product-price')
        totalProductPrice.innerHTML = `(total:&nbsp;<formatted-currency value="${quantity * product.price}"></formatted-currency>)`
        deleteButton.innerText = 'Delete'

        productElement.setAttribute('category', categoryId)
        productElement.setAttribute('id', product.id)
        productElement.setAttribute('type', product.type)
        productElement.setAttribute('variant', product.variant)
        productElement.setAttribute('price', product.price)

        productElement.appendChild(totalProductPrice)
        productElement.appendChild(counterControl)
        productElement.appendChild(deleteButton)

        list.appendChild(productElement)
      })

      this._shadowRoot.appendChild(list)
      this.updateTotalPrice()
    })
  }
}

window.customElements.define('view-cart', ViewCart)