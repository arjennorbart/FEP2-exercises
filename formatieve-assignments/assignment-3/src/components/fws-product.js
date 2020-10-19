import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
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

class FWSProduct extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      // Product properties
      id: { type: String, reflect: true },
      type: { type: String, reflect: true },
      price: { type: Number, reflect: true },
      variant: { type: String, reflect: true },

      category: { reflect: true },
    }
  }
  
  render() {
    return html`
    <span class="product-wrapper">
      <a href="${`/product.html?category=${this.getAttribute('category')}&id=${this.getAttribute('id')}`}">
        ${this.category && this.id && html`<img src="/assets/products/${this.category}/rpg_icons${this.id}.png" />`}
        <span class="title-wrapper">
          <h3>Type: ${this.type}</h3>
          <span>${this.variant}</span>
          ${this.price && html`<formatted-currency class="price" value="${this.price}"></formatted-currency>`}
        </span>
      </a>
      <slot />
    </span>
  `
  }
}

window.customElements.define('fws-product', FWSProduct)