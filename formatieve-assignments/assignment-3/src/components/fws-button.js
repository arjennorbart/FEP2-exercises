import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
  }

  button {
    font-family: 'Fira Code', monospace;
  }
`

class FwsButton extends LitElement {
  static get styles() { return styles }

  handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let event = new CustomEvent('click');
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button @click="${this.handleClick}">
        <slot></slot>
      </button>
    `
  }
}

window.customElements.define('fws-button', FwsButton)