const styles = /* css */`
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

const template = /* html */`
  <style>${styles}</style>
  <fws-header></fws-header>
  <main>
    <slot />
  </main>
  <fws-footer></fws-footer>
`

class AppRoot extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.innerHTML = template
  }

  connectedCallback() {
    if (location.pathname !== '/') {
      const backButton = document.createElement('button')
      backButton.innerText = '< Back'
      backButton.slot = 'action'
      backButton.onclick = () => { history.back() }

      this._shadowRoot.querySelector('fws-header').appendChild(backButton)
    }
  }
}

window.customElements.define('app-root', AppRoot)