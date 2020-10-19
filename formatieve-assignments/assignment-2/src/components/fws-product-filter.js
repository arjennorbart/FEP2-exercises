import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import getSelectedOptionValues from '../utils/get-selected-option-values.js'

const styles = css`
  :host {
    display: block;
    text-align: right;
    position: relative;
    z-index: 1;
  }

  :host([open]) form {
    display: flex;
  }
 
  form {
    display: none;
    flex-direction: column;
    border: 2px solid var(--text-color);
    background-color: var(--background-color);
    position: absolute;
    right: 0;
    padding: var(--spacing-half);
    box-shadow: 0px 3px 14px 0px rgba(255,255,255,1);
  }

  label {
    display: flex;
    justify-content: space-between;
  }

  label:not(:last-child) {
    padding-bottom: var(--spacing-half);
  }

  select {
    width: 100px;
    margin-left: var(--spacing-half);
  }
`

class FWSProductFilter extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      show: { type: Boolean, attribute: 'open', reflect: true },
      categoryOptions: { type: Array },
      typeOptions: { type: Array },
      variantOptions: { type: Array },
    }
  }

  constructor() {
    super()
    this.categoryOptions = []
    this.typeOptions = []
    this.variantOptions = []
    this.show = false
  }

  get categories() {
    return getSelectedOptionValues(this.shadowRoot.querySelector('[name="categories"]'))
  }
  get types() {
    return getSelectedOptionValues(this.shadowRoot.querySelector('[name="types"]'))
  }
  get variants() {
    return getSelectedOptionValues(this.shadowRoot.querySelector('[name="variants"]'))
  }

  toggleFilterPanel = () => {
    this.show = !this.show
    setTimeout(() => {
      if (this.show) {
        document.addEventListener('click', this.onClickOutside)
      } else {
        document.removeEventListener('click', this.onClickOutside)
      }
    }, 0)
  }

  emitChange = () => {
    const event = new CustomEvent('change')
    this.dispatchEvent(event)
  }

  onResetForm = () => {
    setTimeout(() => {
      this.emitChange()
    }, 0)
  }

  onClickOutside = (event) => {
    if (event.composedPath().includes(this) === false) {
      this.show = false
    }
  }

  render() {
    return html`
      <fws-button @click="${this.toggleFilterPanel}">filter</fws-button>
      <form @reset="${this.onResetForm}">
        <label>
          Categories:
          <select name="categories" multiple @change="${this.emitChange}">
            <option value="all" selected>All</option>
            ${this.categoryOptions.map(option => html`
              <option value="${option.value}">${option.displayName}</option>
            `)}
          </select>
        </label>
    
        <label>
          Types:
          <select name="types" multiple @change="${this.emitChange}">
            <option value="all" selected>All</option>
            ${this.typeOptions.map(option => html`
              <option value="${option.value}">${option.displayName}</option>
            `)}
          </select>
        </label>
    
        <label>
          Variant:
          <select name="variants" multiple @change="${this.emitChange}">
            <option value="all" selected>All</option>
            ${this.variantOptions.map(option => html`
              <option value="${option.value}">${option.displayName}</option>
            `)}
          </select>
        </label>
        <input type="reset" />
      </form>
    `
  }
}

window.customElements.define('fws-product-filter', FWSProductFilter)