const styles = /* css */`
  :host {
    display: block;
    text-align: center;
    padding: var(--spacing-half);
  }
`

const template = /* html */`
  <style>${styles}</style>
  Made by me!
`

class FWSFooter extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template
  }
}

window.customElements.define('fws-footer', FWSFooter)