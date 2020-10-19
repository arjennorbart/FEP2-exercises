const styles = /* css */`
  :host {
    --products-per-row: 1;
    display: block;
  }

  h2 {
    font-family: 'Special Elite', cursive;
    color: var(--text-color);
    margin: 0;
  }

  h2:empty {
    display: none;
  }

  div {
    display: grid;
    grid-template-columns: repeat(var(--products-per-row), 1fr);
    gap: var(--spacing-half);
  }
`

const template = /* html */`
  <style>${ styles }</style>
  <h2></h2>
  <div>
    <slot />
  </div>
`

class FWSProductList extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
    this.titleElement = this._shadowRoot.querySelector('h2')
  }

  connectedCallback() {
    this.titleElement.innerText = this.getAttribute('category-name')
  }
}

window.customElements.define('fws-product-list', FWSProductList)