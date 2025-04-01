import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class DropdownMenu extends SwimlaneElement {

    static get properties() {
        return {
            label: { type: String },
            placeholder: { type: String },
            enabled: { type: Boolean },
            values: { type: Array },
            _selectedValue: { type: Object },
            multiSelect: { type: Boolean },
            dropdownVisible: { type: Boolean },
            width: { type: String },
            filterText: { type: String },
            dropdownPosition: { type: Object },
        };
    }

    constructor() {
        super();
        this.label = 'Dropdown';
        this.placeholder = 'Select...';
        this.enabled = true;
        this.values = [];
        this.multiSelect = false;
        this.dropdownVisible = false;
        this.width = '100%';
        this.filterText = '';
        this.dropdownPosition = { top: 0, left: 0, width: '100%' };

        this._handleOutsideClick = (event) => {
            const path = event.composedPath();
            const dropdown = this.shadowRoot.querySelector('.slit-dropdown-selections');
            const dropdownContent = this.shadowRoot.querySelector('.slit-dropdown-content');

            if (!path.includes(dropdown) && !path.includes(dropdownContent)) {
                this.closeDropdown();
            }
        };

        this._handleEscKeyPress = (event) => {
            if (this.dropdownVisible && event.key === 'Escape') {
                this.closeDropdown();
            }
        };

        this._handleScroll = () => {
            console.log('this._handleScroll')
            if (this.dropdownVisible) {
                this.calculateDropdownPosition();
            }
        };
    }

    set selectedValue(newSelectedValue) {
        this._selectedValue = newSelectedValue;
        this.requestUpdate();
    }

    get selectedValue() {
        return this._selectedValue;
    }

    connectedCallback() {

        super.connectedCallback();

        window.addEventListener('click', this._handleOutsideClick);

        window.addEventListener('keydown', this._handleEscKeyPress);
    }

    disconnectedCallback() {

        super.disconnectedCallback();

        window.removeEventListener('click', this._handleOutsideClick);

        window.removeEventListener('keydown', this._handleEscKeyPress);

        window.removeEventListener('scroll', this._handleScroll);
    }

    updated(changedProperties) {

        super.updated(changedProperties);

        if (changedProperties.has('width')) {

            this.style.setProperty('--dropdown-width', this.width);
        }
    }

    static get styles() {
        return css`
        :host {
            display: block;
            width: var(--dropdown-width, 100%);
        }
        .slit-dropdown-container{
            padding: 0.2em;
            margin: 0.2em;
        }
        .slit-dropdown-label {
            color: #818fa9;
            cursor: pointer;
            display: block;
            font-size: 11.2px;
            font-weight: 600;
            line-height: 1em;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            transition: color .2s ease-out, font-size .15s ease-out, top .15s ease-out
        }

        .slit-dropdown-label.active {
            color: #1483ff;
        }

        .slit-dropdown-selections {
            background-color: transparent;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            padding: 8px;
            width: 100%;
            z-index: 1;
        }
        .slit-dropdown-selections.disabled {
            background-color: #f0f0f0;
            cursor: not-allowed;
        }
        .slit-dropdown-selections.placeholder {
            color: #818fa9;
        }
        .slit-dropdown-content {
            background-color: #303847;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 200px;
            overflow-y: auto;
            padding: 8px 0;
            position: fixed;
            z-index: 1000;
        }
        .slit-dropdown-content.visible {
            display: block;
        }
        
        .slit-dropdown-content::-webkit-scrollbar {
            width: 0.8em;
        }

        .slit-dropdown-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .slit-dropdown-content::-webkit-scrollbar-thumb {
            background-color: #363D50;
            border-radius: 1em;
            border: 0.2em solid transparent;
        }

        .slit-dropdown-content::-webkit-scrollbar-thumb:hover {
            background-color: #4F5C75;
        }
        .dropdown-item {
            padding: 8px;
            cursor: pointer;
        }
        .dropdown-item:hover {
            background-color: #2A3240;
        }
        .dropdown-item.selected {
            background-color: #2A3240;
        }
        .slit-filter-input {
            background-color: #455066;
            caret-color: #818fa9;
            outline: none;
            border: none;
            box-sizing: border-box;
            font-family: "Source Sans Pro", "Open Sans", Arial, sans-serif;
            padding: 8px;
            width: 100%;
        }
        .slit-filter-input::placeholder {
            color: #818fa9;
        }
        .selected-values {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            min-height: 32px;
            background-color: transparent;
        }
        .selected-chip {
            display: flex;
            align-items: center;
            padding: 4px 8px;
            background-color: #455066;
            border-radius: 3px;
            margin-right: 4px;
        }
        .selected-chip-button {
            background: none;
            border: none;
            cursor: pointer;
            margin-left: 4px;
            font-weight: bold;
            color: #818fa9;
        }
        .checkbox {
            margin-right: 8px;
        }

        .slit-dropdown-selections-bottom-border {
            height: 1px;
            background-color: #455066;
            width: 100%;
            transition: width .25s ease-out;
        }

        .slit-dropdown-selections-bottom-border.active {
            width: 100%;
            background-color: #1483ff;
        }

        .button-container {
            display: flex;
            gap: 8px; /* Adjust as needed for spacing between buttons */
            margin-left: auto;
        }


        .slit-icon {
            -webkit-font-smoothing: antialiased;
            font-family: ngx-icon;
            font-feature-settings: normal;
            font-kerning: auto;
            font-optical-sizing: auto;
            font-size-adjust: none;
            font-size: 1em;
            font-stretch: normal;
            font-style: normal;
            font-variant-alternates: normal;
            font-variant-caps: normal;
            font-variant-east-asian: normal;
            font-variant-ligatures: normal;
            font-variant-numeric: normal;
            font-variant-position: normal;
            font-variation-settings: normal;
            font-weight: 400;
            line-height: 1;
            transition: transform 0.25s ease-in-out;
        }
        .chevron-button,
        .clear-button {
            background: none;
            border: none;
            cursor: pointer;
            color: #818fa9;
            padding: 0;
            margin-left: 8px;
            display: inline-flex;
            align-items: center;
            transition: color 0.2s ease;
        }

        .chevron-button i::before {
            content: "\\ea5d"; /* Chevron icon code */
            font-size: 12px;
            display: inline-block;
            transition: transform 0.2s ease, color 0.2s ease;
            font-family: ngx-icon;
        }

        .clear-button i::before {
            content: "\\eba5"; 
            font-size: 12px;
            display: inline-block;
            transition: color 0.2s ease;
            font-family: ngx-icon;
        }

        /* Rotate chevron and change colors when dropdown is open */
        .chevron-button i::before,
        .clear-button i::before {
            color: #818fa9;
        }

        :host([dropdownVisible]) .chevron-button i::before {
            transform: rotate(180deg);
            color: #1483ff;
        }

        :host([dropdownVisible]) .clear-button i::before,
        :host([dropdownVisible]) .chevron-button i::before {
            color: #1483ff;
        }
    `;
    }

    render() {

        if (!this._selectedValue) {
            this._selectedValue = this.multiSelect ? [] : '';
        }
        const filteredValues = this.values.filter((value) =>
            value.toLowerCase().includes(this.filterText)
        );

        return html`
        <div class="slit-dropdown-container">
            <label class="slit-dropdown-label ${this.dropdownVisible ? 'active' : ''}"
                @click=${(e) => this.toggleDropdown(e)}>${this.label}</label>
            <div class="slit-dropdown-selections ${this._selectedValue ? '' : 'placeholder'} ${this.enabled ? '' : 'disabled'}" 
                @click=${(e) => this.toggleDropdown(e)}>
                ${this.renderSelectedValues()}
                
                <div class="button-container">
                ${!this.multiSelect && this._selectedValue ? html`
                    <button class="clear-button" @click=${(event) => this.clearSelectedValue(event)} >
                        <i class="slit-icon "></i>
                    </button>` : ''}
                
                <button class="chevron-button" 
                    @click=${(e) => this.toggleDropdown(e)}>
                    <i class="slit-icon "></i>
                </button>
                </div>
                
            </div>
            <div class="slit-dropdown-selections-bottom-border ${this.dropdownVisible ? 'active' : ''}"></div>
            

      <div class="slit-dropdown-content ${this.dropdownVisible ? 'visible' : ''}" 
           style="top: ${this.dropdownPosition.top}px; left: ${this.dropdownPosition.left}px; width: ${this.dropdownPosition.width};">
        
        <input 
          type="text" 
          class="slit-filter-input" 
          placeholder="Filter options..." 
          .value=${this.filterText}
          @input=${(e) => this.handleFilterChange(e)}
        />

        ${filteredValues.length > 0
                ? filteredValues.map(
                    (value) =>
                        html`<div 
                class="dropdown-item ${this._selectedValue.includes(value) ? 'selected' : ''}" 
                @click=${(e) => this.selectItem(value)}>
                  ${this.multiSelect
                                ? html`<input type="checkbox" class="checkbox" ?checked=${this._selectedValue.includes(value)} />`
                                : ''}
                  ${value}
                </div>`
                )
                : html`<div class="dropdown-item">No options found</div>`}
      </div>
      </div>
    `;
    }

    toggleDropdown(event) {
        if (!this.enabled) return;

        const path = event.composedPath();
        const isChipButton = path.length > 0 && path[0].classList && path[0].classList.contains('selected-chip-button');

        if (!isChipButton) {
            this.dropdownVisible = !this.dropdownVisible;
            this.filterText = '';

            console.log(`Dropdown visibility changed: ${this.dropdownVisible}`);

            if (this.dropdownVisible) {
                this.calculateDropdownPosition();
                window.addEventListener('scroll', this._handleScroll, { passive: true });
                console.log('Scroll event listener added');
            } else {
                window.removeEventListener('scroll', this._handleScroll);
                console.log('Scroll event listener removed');
            }
        }
    }

    closeDropdown() {
        this.dropdownVisible = false;
        window.removeEventListener('scroll', this._handleScroll);
    }

    calculateDropdownPosition() {

        const dropdownRect = this.shadowRoot.querySelector('.slit-dropdown-selections-bottom-border').getBoundingClientRect();
        this.dropdownPosition = {
            top: dropdownRect.bottom + window.scrollY,
            left: dropdownRect.left + window.scrollX,
            width: dropdownRect.width + 'px',
        };
    }

    handleFilterChange(event) {
        this.filterText = event.target.value.toLowerCase();
    }

    selectItem(value) {
        if (this.multiSelect) {

            if (this._selectedValue.includes(value)) {
                this._selectedValue = this._selectedValue.filter((v) => v !== value);
            } else {
                this._selectedValue = [...this._selectedValue, value];
            }
        } else {

            this._selectedValue = value;
            this.dropdownVisible = false;
        }

        this._emitValue();
    }

    removeSelectedItem(value) {
        this._selectedValue = this._selectedValue.filter((v) => v !== value);

        this._emitValue();
    }

    clearSelectedValue(event) {
        event.stopPropagation();
        this._selectedValue = this.multiSelect ? [] : '';
        this.requestUpdate();
        this._emitValue();
    }

    _emitValue() {
        const customEvent = new CustomEvent('selection-changed', {
            detail: { _selectedValue: this._selectedValue },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }

    renderSelectedValues() {
        if (this.multiSelect && Array.isArray(this._selectedValue)) {
            if (this._selectedValue.length > 0) {
                return html`
                    <div class="selected-values">
                    ${this._selectedValue.map(
                    (value) => html`
                        <div class="selected-chip">
                            ${value}
                            <button class="selected-chip-button" @click=${() => this.removeSelectedItem(value)}>✕</button>
                        </div>
                        `
                )}
                    </div>
                `;
            } else {
                return html`${this.placeholder}`;
            }
        }
        return html`${this._selectedValue || this.placeholder}`;
    }
}

if (customElements.get('slit-dropdown-menu') === undefined) {
    customElements.define('slit-dropdown-menu', DropdownMenu);
}