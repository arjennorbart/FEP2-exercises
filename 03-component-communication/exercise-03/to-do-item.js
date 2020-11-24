const template = document.createElement('template')
template.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>`

class TodoItem extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['checked', 'text', 'index'];
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
        this._renderTodoItem();
        const inputCheckbox = this.querySelector('input');
        inputCheckbox.addEventListener("change", () => {
            const event = new CustomEvent('toggleToDo', {detail: this.index});
            this.dispatchEvent(event);
        })
    }

    _renderTodoItem() {
        this.index = this.getAttribute('index');
        this.text = this.getAttribute('text');

        if (this.checked) {
            this.querySelector('input').checked = true;
            this.querySelector('.item').classList.add('completed');
        }
        this.querySelector('label').innerHTML = this.text;
    }

    set text(value) {
        this._text = value;
    }

    get text() {
        return this._text;
    }

    set index(value) {
        this._index = value;
    }

    get index() {
        return this._index;
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }
}

window.customElements.define('to-do-item', TodoItem);