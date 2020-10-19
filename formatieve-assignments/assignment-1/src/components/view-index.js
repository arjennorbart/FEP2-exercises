import getData from '../utils/get-data.js'

const styles = /* css */`
  :host {
    display: block;
  }

  fws-product-list:not(:last-child) {
    margin-bottom: var(--spacing-default)
  }
`

const template = /* html */`
  <style>${styles}</style>
  <fws-product-filter></fws-product-filter>
`

function getOptions(data, property) {
  const types = new Set()

  data.forEach(category => {
    category.products.forEach(product => {
      types.add(product[property])
    })
  })
  return [...types]
}

class ViewIndex extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.filters = this._shadowRoot.querySelector('fws-product-filter')
    this.productsData = []
    this.filteredProductsData = []
  }

  filterProducts = () => {
    const { categories, types, variants } = this.filters
    const filteredData = this.productsData
      .filter(category => categories.includes('all') || categories.includes(category.id))
      .map(category => {
        const filteredProducts = category.products
          .filter(product => types.includes('all') || types.includes(product.type))
          .filter(product => variants.includes('all') || variants.includes(product.variant))
        return { ...category, products: filteredProducts }
      })
      .filter(category => category.products.length > 0)

    this.filteredProductsData = filteredData
  }

  set filteredProductsData(filteredData) {
    this._shadowRoot.querySelectorAll('fws-product-list').forEach(productsList => productsList.remove())
    filteredData.forEach(category => {
      const list = document.createElement('fws-product-list')
      list.setAttribute('category-name', category.name)
      list.style.setProperty('--products-per-row', '3')

      category.products.forEach(product => {
        const productElement = document.createElement('fws-product')
        productElement.setAttribute('category', category.id)
        productElement.setAttribute('id', product.id)
        productElement.setAttribute('type', product.type)
        productElement.setAttribute('variant', product.variant)
        productElement.setAttribute('price', product.price)
        productElement.style.setProperty('--title-flex-direction', 'column')
        list.appendChild(productElement)
      })
      this._shadowRoot.appendChild(list)
    })
  }

  connectedCallback() {
    this.filters.addEventListener('change', this.filterProducts)

    getData('categories')
      .then(({ categories }) => Promise.all(
        categories.map(category => getData(category))
      ))
      .then(result => {
        this.filters.categoryOptions = result.map(category => ({ value: category.id, displayName: category.name }))
        this.filters.typeOptions = getOptions(result, 'type').map(option => ({ value: option, displayName: `Type ${option}` }))
        this.filters.variantOptions = getOptions(result, 'variant').map(option => ({ value: option, displayName: option }))
        this.productsData = result
      })
      .then(() => this.filterProducts())
  }

  disconnectedCallback() {
    this.filters.removeEventListener('change', this.filterProducts)
  }
}

window.customElements.define('view-index', ViewIndex)