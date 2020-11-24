class LightBulb extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const lightBulb = document.createElement("div");
        lightBulb.className = "light-switch";
        lightBulb.id = "bulb";
        lightBulb.setAttribute("switch", "off");

        const button = document.createElement("button");
        button.id = "light-button";
        button.textContent = "Turn On/Off";

        this.appendChild(lightBulb);
        this.appendChild(button);

        button.addEventListener("click", this.switchLight)
    }

    switchLight() {
        const bulb = document.querySelector("#bulb");
        if (bulb.style.backgroundColor === "grey") {
            bulb.style.backgroundColor = "yellow";
            bulb.setAttribute("switch", "on");
        } else {
            bulb.style.backgroundColor = "grey";
            bulb.setAttribute("switch", "off");
        }
    }
}

window.customElements.define('light-switch', LightBulb);