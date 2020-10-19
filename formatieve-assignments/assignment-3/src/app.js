import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

const styles = css`
  :host {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  main {
    position: relative;
    padding: var(--spacing-default);
    max-width: 960px;
    left: 50%;
    transform: translateX(-50%);
  }
`

class AppRoot extends LitElement {
  static get styles() { return styles }

  static get properties() {
    return {
      isHome: { type: Boolean, reflect: true }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.isHome = location.pathname == '/'
  }

  handleGoBack() {
    history.back()
  }

  render() {
    return html`
      <fws-header>
        ${ this.isHome === false && html`<fws-button slot="action" @click="${this.handleGoBack}">< Back</fws-button>` }
      </fws-header>
      <main>
        <slot></slot>
      </main>
      <fws-footer></fws-footer>
    `;
  }
}

customElements.define('app-root', AppRoot)