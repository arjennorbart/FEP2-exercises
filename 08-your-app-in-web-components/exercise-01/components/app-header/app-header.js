import {LitElement, html} from 'lit-element';

class AppHeader extends LitElement {
  render() {
    return html`
      <div>Hello from AppHeader!</div>
    `;
  }
}

customElements.define('app-header', AppHeader);