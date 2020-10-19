import getSelectedOptionValues from '../utils/get-selected-option-values.js'

const styles = /* css */`
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

const template = /* html */`
  <style>${styles}</style>
  <fws-button data-toggle>filter</fws-button>
  <form>
    <label>
      Categories:
      <select name="categories" multiple>
        <option value="all" selected>All</option>
      </select>
    </label>

    <label>
      Types:
      <select name="types" multiple>
        <option value="all" selected>All</option>
      </select>
    </label>

    <label>
      Variant:
      <select name="variants" multiple>
        <option value="all" selected>All</option>
      </select>
    </label>
    <input type="reset" />
  </form>
`

class FWSProductFilter extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.form = this._shadowRoot.querySelector('form')
    this.toggle = this._shadowRoot.querySelector('[data-toggle]')
  }

  get show() {
    return this.hasAttribute('open')
  }

  set show(show) {
    if (show) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  set categoryOptions(options) {
    this.addOptionsToSelect(this._shadowRoot.querySelector('[name="categories"]'), options)
  }

  set typeOptions(options) {
    this.addOptionsToSelect(this._shadowRoot.querySelector('[name="types"]'), options)
  }

  set variantOptions(options) {
    this.addOptionsToSelect(this._shadowRoot.querySelector('[name="variants"]'), options)
  }

  get categories() {
    return getSelectedOptionValues(this._shadowRoot.querySelector('[name="categories"]'))
  }
  get types() {
    return getSelectedOptionValues(this._shadowRoot.querySelector('[name="types"]'))
  }
  get variants() {
    return getSelectedOptionValues(this._shadowRoot.querySelector('[name="variants"]'))
  }

  addOptionsToSelect = (selectElement, options) => {
    // Remove all existing options except the first (all)
    [...selectElement.children].forEach((child, index) => {
      if (index !== 0) {
        child.remove()
      }
    })

    // Add options as option elements
    options.forEach(option => {
      const optionElement = document.createElement('option')
      optionElement.value = option.value
      optionElement.innerText = option.displayName
      selectElement.appendChild(optionElement)
    })
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

  connectedCallback() {
    this.toggle.addEventListener('click', this.toggleFilterPanel)
    this._shadowRoot.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', this.emitChange)
    })
    this.form.addEventListener('reset', this.onResetForm)
  }

  disconnectedCallback() {
    this.toggle.removeEventListener('click', this.toggleFilterPanel)
    this.form.removeEventListener('reset', this.onResetForm)
  }
}

window.customElements.define('fws-product-filter', FWSProductFilter)