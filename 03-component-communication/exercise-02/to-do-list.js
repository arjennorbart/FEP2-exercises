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

    set todos(value) {
        this._todos = value;
        this._renderList();
    }

    get todos() {
    }

    _renderList() {
        this._todos.forEach((todoItem, index) => {
            let $todoItem = document.createElement("li");
            $todoItem.innerHTML = `${todoItem.text}`;
            this.querySelector("#todos").appendChild($todoItem);
        })
    }
}

window.customElements.define('to-do-list', TodoList);