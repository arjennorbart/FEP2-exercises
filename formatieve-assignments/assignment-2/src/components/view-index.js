import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import getData from '../utils/get-data.js'
import filterProducts from '../utils/filter-products.js'

const styles = css`
  :host {
    display: block;
  }

  fws-product-list:not(:last-child) {
    margin-bottom: var(--spacing-default)
  }
`

class Viewindex extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      productsData: { type: Array },
      filteredProductsData: { type: Array },
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
    this.productsData = []
    this.filteredProductsData = []
    this.categoryFilterOptions = []
    this.typeFilterOptions = []
    this.variantFilterOptions = []
  }

  setFilterValues = () => {
    const filterElement = this.shadowRoot.querySelector('fws-product-filter')
    this.categoryFilterValues = filterElement.categories
    this.typeFilterValues = filterElement.types
    this.variantFilterValues = filterElement.variants
  }

  updated(changedProperties) {
    if (
      changedProperties.has('categoryFilterValues') ||
      changedProperties.has('typeFilterValues') ||
      changedProperties.has('variantFilterValues')
    ) {
      this.filteredProductsData = filterProducts({
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
      ${this.filteredProductsData.map(category => html`  
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
      `)}`
  }
}

window.customElements.define('view-index', Viewindex)
