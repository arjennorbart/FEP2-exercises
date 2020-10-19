class MyCounter extends HTMLElement {
    static formAssociated = true;

    static get observedAttributes() {
        return ["step"];
    }

    constructor() {
        super();
        this.internals_ = this.attachInternals();
        this.innerHTML = `
        <button type="button" id="decreaseBtn">-</button>
        <input value="0" type="number">
        <button type="button" id="increaseBtn">+</button>
    `;

        // add event listeners on both buttons
        this.querySelector('#increaseBtn').addEventListener('click', this.increase.bind(this));
        this.querySelector('#decreaseBtn').addEventListener('click', this.decrease.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "step") {
            this.step = newValue;
        }
    }

    // Form controls usually expose a "value"  property
    get value() { return this.querySelector('input').value; }

    set value(val) {
        this.querySelector('input').value = val;
    }

    get step() {
        return this.getAttribute('step');
    }

    set step(val) {
        this._step = val;
    }

    increase() {
        this.value = Number(this.value) + Number(this._step);
        this.validate();
    }

    decrease() {
        this.value = Number(this.value) - Number(this._step);
        this.validate();
    }
}

customElements.define('my-counter', MyCounter);
