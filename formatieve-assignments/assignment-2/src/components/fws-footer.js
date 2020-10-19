import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
  :host {
    display: block;
    text-align: center;
    padding: var(--spacing-half);
  }
`

class FWSFooter extends LitElement {
  static get styles() { return styles }

  render() {
    return html`Made by Me!`
  }
}

window.customElements.define('fws-footer', FWSFooter)