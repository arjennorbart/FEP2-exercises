const styles = /* css */`
  :host {
    --title-flex-direction: row;
    --image-size: 32px;
    box-shadow: 0px 0px 0px 0px rgba(255,255,255,1);
    transition: box-shadow 0.15s ease-out;
  }
  :host(:hover) {
    box-shadow: 0px 3px 14px 0px rgba(255,255,255,1);
  }

  .product-wrapper {
    display: inline-flex;
    border: 1px solid var(--text-color);
    padding: var(--spacing-half);
    width: calc(100% - var(--spacing-default));
  }

  .title-wrapper {
    position: relative;
    display: inline-flex;
    flex-direction: var(--title-flex-direction);
    flex: 1;
    align-items: baseline;
  }

  .title-wrapper > * {
    padding-left: var(--spacing-half);
  }

  .price {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    flex: 1;
  }

  img {
    width: var(--image-size);
    height: var(--image-size);
    margin-right: 0.5rem;
  }

  h3 {
    margin: 0;
  }
`

const template = /* html */`
  <style>${ styles }</style>
  <span class="product-wrapper">
    <a>
      <img src="" />
      <span class="title-wrapper">
        <h3 data-title></h3>
        <span data-variant></span>
        <formatted-currency class="price" data-price></formatted-currency>
      </span>
    </a>
    <slot />
  </span>
`

class FWSProduct extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
  }

  connectedCallback() {
    const link = this._shadowRoot.querySelector('a')
    const image = this._shadowRoot.querySelector('img')
    const title = this._shadowRoot.querySelector('[data-title]')
    const variant = this._shadowRoot.querySelector('[data-variant]')
    const price = this._shadowRoot.querySelector('[data-price]')
    
    link.href = `/product.html?category=${this.getAttribute('category')}&id=${this.getAttribute('id')}`
    image.src = `/assets/products/${this.getAttribute('category')}/rpg_icons${this.getAttribute('id')}.png`
    title.innerText = `Type ${this.getAttribute('type')}`
    variant.innerText = this.getAttribute('variant')

    if (this.getAttribute('price')) {
      price.value = this.getAttribute('price')
    }
  }
}

window.customElements.define('fws-product', FWSProduct)