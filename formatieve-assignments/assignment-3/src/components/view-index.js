import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { connect } from 'https://cdn.skypack.dev/pwa-helpers@0.9.1/connect-mixin.js';
import store from '../store/index.js'
import filterProducts from '../utils/filter-products.js'

const styles = css`
  :host {
    display: block;
  }

  fws-product-list:not(:last-child) {
    margin-bottom: var(--spacing-default)
  }
`

function getOptions(productsData, property) {
  const types = new Set()

  productsData.forEach(category => {
    category.products.forEach(product => {
      types.add(product[property])
    })
  })

  return [...types]
}

class ViewIndex extends connect(store)(LitElement) {
  static get styles() { return styles }

  static get properties() {
    return {
      productsData: { type: Array },
      filteredProductData: { type: Array },
      categoryFilterOptions: { type: Array },
      categoryFilterValues: { type: Array },
      typeFilterOptions: { type: Array },
      typeFilterValues: { type: Array },
      variantFilterOptions: { type: Array },
      variantFilterValues: { type: Array },
    }
  }

  constructor() {
    super()
    this.filteredProductData = []
    this.categoryFilterOptions = []
    this.categoryFilterValues = ['all']
    this.typeFilterOptions = []
    this.typeFilterValues = ['all']
    this.variantFilterOptions = []
    this.variantFilterValues = ['all']
  }

  stateChanged(state) {
    if (state.products) {
      this.productsData = state.products
      this.categoryFilterOptions = this.productsData.map(category => ({ value: category.id, displayName: category.name }))
      this.typeFilterOptions = getOptions(this.productsData, 'type').map(option => ({ value: option, displayName: `Type ${option}` }))
      this.variantFilterOptions = getOptions(this.productsData, 'variant').map(option => ({ value: option, displayName: option }))
      this.setFilterValues()
    }
  }

  setFilterValues = () => {
    const filterElement = this.shadowRoot.querySelector('fws-product-filter')
    if (filterElement) {
      this.categoryFilterValues = filterElement.categories
      this.typeFilterValues = filterElement.types
      this.variantFilterValues = filterElement.variants
    }
  }

  updated(changedProperties) {
    if (
      changedProperties.has('categoryFilterValues') ||
      changedProperties.has('typeFilterValues') ||
      changedProperties.has('variantFilterValues')
    ) {
      this.filteredProductData = filterProducts({
        productsData: this.productsData,
        allowedCategories: this.categoryFilterValues,
        allowedTypes: this.typeFilterValues,
        allowedVariants: this.variantFilterValues
      })
    }
  }

  render() {
    return html`
      <fws-product-filter
        .categoryOptions="${this.categoryFilterOptions}"
        .typeOptions="${this.typeFilterOptions}"
        .variantOptions="${this.variantFilterOptions}"
        @change=${this.setFilterValues}
      ></fws-product-filter>
      ${this.filteredProductData.map(category => html`
        <fws-product-list
          style="--products-per-row: 3"
          list-title="${category.name}"
        >
          ${category.products.map(product => html`
            <fws-product
              category="${category.id}"
              id="${product.id}"
              type="${product.type}"
              variant="${product.variant}"
              price="${product.price}"
              style="--title-flex-direction: column"
            ></fws-product>
          `)}
        </fws-product-list>
      `)}
    `
  }
}

window.customElements.define('view-index', ViewIndex)
