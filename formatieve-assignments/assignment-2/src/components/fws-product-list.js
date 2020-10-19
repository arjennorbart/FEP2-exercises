import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
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

class FWSProductList extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      listTitle: { type: String, attribute: 'list-title', reflect: true },
    }
  }
  
  render() {
    return html`
      <h2>${this.listTitle}</h2>
      <div>
        <slot />
      </div>
    `
  }
}

window.customElements.define('fws-product-list', FWSProductList)