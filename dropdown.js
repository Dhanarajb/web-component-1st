const template = document.createElement('template');
template.innerHTML = `
<style>
/* styles for the dropdown */
.dropdown-container {
position: relative;
width: 200px;
}

.dropdown-button {
background-color: #9ea3a0;
padding: 12px;
border: none;
width: 100%;
text-align: left;
border: 1px solid #D3D3D3;
border-radius:5px;
}

.dropdown-button:hover{
border: 1px solid blue;
}

.dropdown-button:focus{
border: 1px solid blue;
}

.dropdown-list {
position: absolute;
top: 100%;
left: 0;
right: 0;
z-index: 1;
background-color: #f5f5f5;
list-style: none;
padding: 0;
margin: 0;
border: 1px solid #ccc;
display: none;
border-radius:5px;
}
.dropdown-list li {
padding: 12px;
cursor: pointer;
border: 1px solid tra
}
.dropdown-list li:hover {
border: 1px solid blue;
}

</style>
<div class="dropdown-container">
<button class="dropdown-button">Select an option</button>
<ul class="dropdown-list"></ul>
</div>
`;

class MyDropdown extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const templateContent = template.content.cloneNode(true);

    this.container = templateContent.querySelector('.dropdown-container');
    this.button = templateContent.querySelector('.dropdown-button');
    this.list = templateContent.querySelector('.dropdown-list');

    this.button.addEventListener('click', () => {
      this.toggleList();
    });

    this.shadowRoot.appendChild(templateContent);
  }

  toggleList() {
    this.list.style.display =
      this.list.style.display === 'none' ? 'block' : 'none';
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.toggleList);
  }

  render() {
    const options = JSON.parse(this.getAttribute('options'));
    options.forEach((option) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.addEventListener('click', () => {
        this.button.innerHTML = option;
        this.toggleList();
      });
      this.list.appendChild(li);
    });
  }
}

customElements.define('my-dropdown', MyDropdown);
