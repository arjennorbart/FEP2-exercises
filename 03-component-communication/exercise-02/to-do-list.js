const template = document.createElement('template')
template.innerHTML = `
    <h1>To do</h1>
    <ul id="todos"></ul>
`;


class TodoList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
    }
}

window.customElements.define('to-do-list', TodoList);