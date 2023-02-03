const template = document.createElement('template');

template.innerHTML = `
<style>
.btnClass {
border-radius: 4px;
text-align: center;
margin: 4px 2px;
cursor: pointer;
}

.small {
padding: 6px, 9px;
font-size: 12px;
}
.medium {
padding: 12px, 18px;
font-size: 14px;
}

.large {
padding: 18px 32px;
font-size: 20px;
}

.success {
background-color: #4CAF50; /* Green */
}

.danger {
background-color: #f44336; /* Red */
}

.info {
background-color: #008CBA; /* Blue */
}

.warning {
background-color: #ff9900 /*orange */
}

</style>
<button class="btnClass"><slot></slot></button>
`;

class MyButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute('size')) {
      this.btnSize = this.getAttribute('size');
    }
    if (this.hasAttribute('color')) {
      this.btnColor = this.getAttribute('color');
    }
    const btn = this.shadowRoot.querySelector('button');
    btn.classList.add(`${this.btnSize}`, `${this.btnColor}`);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'size') {
      this.size = newValue;
    }

    if (name === 'color') {
      this.color = newValue;
    }
  }

  static get observedAttrinutes() {
    return ['size', 'color'];
  }
}

customElements.define('my-button', MyButton);
