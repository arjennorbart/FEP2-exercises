import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
  :host {
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
    height: 3rem;
    padding: var(--spacing-half);
  }

  h1 {
    font-family: 'Special Elite', cursive;
    margin: 0;
    text-align: center;
    color: var(--text-color);
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }
`

class FWSHeader extends LitElement {
  static get styles() { return styles }

  render() {
    return html`
      <div>
        <slot name="action"></slot>
      </div>
      <h1><a href="/">Fantasy Weapons Store</a></h1>
      <fws-cart></fws-cart>
    `
  }
}

window.customElements.define('fws-header', FWSHeader)