import {LitElement, html} from 'lit-element';

class AppNavigation extends LitElement {
  render() {
    return html`
      <div>Hello from AppNavigation!</div>
    `;
  }
}

customElements.define('app-navigation', AppNavigation);