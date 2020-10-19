const styles = /* css */`
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

const template = /* html */`
  <style>${styles}</style>
  <div>
    <slot name="action"></slot>
  </div>
  <h1><a href="/">Fantasy Weapons Store</a></h1>
  <fws-cart></fws-cart>
`

class FWSHeader extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template
  }
}

window.customElements.define('fws-header', FWSHeader)