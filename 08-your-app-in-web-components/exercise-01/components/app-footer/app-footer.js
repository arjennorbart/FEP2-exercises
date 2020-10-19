import {LitElement, html} from 'lit-element';

class AppFooter extends LitElement {
  render() {
    return html`
      <div>Hello from AppFooter!</div>
    `;
  }
}

customElements.define('app-footer', AppFooter);