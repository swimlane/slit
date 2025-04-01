import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class RoundCheckbox extends SwimlaneElement {
    static get properties() {
        return {
            name: { type: String },
            diameter: { type: String },
            checked: { type: Boolean, reflect: true },
            tabindex: { type: Number },
            disabled: { type: Boolean, reflect: true },
            round: { type: Boolean, reflect: true }
        };
    }

    constructor() {
        super();
        this.name = '';
        this.diameter = '18px';
        this.checked = false;
        this.tabindex = 0;
        this.disabled = false;
        this.round = false;
    }

    static get styles() {
        return css`
        :host {
          display: inline-block;
          --color-blue-grey-600: #607d8b;
          --color-blue-grey-100: #cfd8dc;
          --color-blue-400: #42a5f5;
          --color-white: #ffffff;
          --color-blue-200: #90caf9;
        }
  
        :host([disabled]) {
          pointer-events: none;
          opacity: 0.6;
        }
  
        .checkbox--label {
          display: flex;
          cursor: pointer;
          align-items: center;
          margin-bottom: 0;
          position: relative;
          outline: none;
        }
  
        .checkbox--label:focus-visible .checkbox--box {
          outline: 2px solid var(--color-blue-200);
        }
  
        .checkbox--label input {
          display: none;
        }
  
        .checkbox--box {
          width: var(--diameter, 18px);
          height: var(--diameter, 18px);
          min-width: var(--diameter, 18px);
          min-height: var(--diameter, 18px);
          border-radius: 100% !important;
          background-color: transparent;
          border: 2px solid var(--color-blue-grey-600);
          margin-right: 10px;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
          user-select: none;
          outline: 0;
          outline-offset: 1px;
        }
  
        :host([round]) .checkbox--box {
          border-radius: 100% !important;
        }
  
        .checkbox--box::after {
          position: absolute;
          top: calc(50% - 7px);
          left: calc(50% - 2px);
          width: 6px;
          height: 12px;
          content: '';
          border: solid var(--color-white);
          border-width: 0 2px 2px 0;
          transform: rotate(0deg) scale(0);
          transition: all 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
        }
  
        :host([checked]) .checkbox--box {
          background-color: var(--color-blue-400);
          border: 2px solid var(--color-blue-400);
          transform: rotate(0deg) scale(1);
        }
  
        :host([checked]) .checkbox--box::after {
          transform: rotate(45deg) scale(1);
        }
  
        .ngx-checkbox--content {
          color: var(--color-blue-grey-100);
        }
      `;
    }

    firstUpdated() {
        this.style.setProperty('--diameter', this.diameter);
    }

    render() {
        return html`
        <label
          class="checkbox--label"
          tabindex="${this.disabled ? -1 : this.tabindex}"
          @keydown=${this._onKeydown}
          @click=${this._onClick}
        >
          <input
            type="checkbox"
            ?checked="${this.checked}"
            ?disabled="${this.disabled}"
            name="${this.name ? this.name + '-chk' : ''}"
            @focus=${this._onFocus}
            @blur=${this._onBlur}
            @change=${this._onInputChange}
            aria-checked="${this.checked}"
          />
          <div class="checkbox--box"></div>
          <div class="ngx-checkbox--content">
            <slot></slot>
          </div>
        </label>
      `;
    }

    _onClick(e) {
        e.preventDefault();
        if (!this.disabled) {
            this.toggle();
            this._emitChange();
        }
    }

    _onKeydown(e) {
        // Space key toggles the checkbox
        if (!this.disabled && (e.code === 'Space' || e.key === ' ')) {
            e.preventDefault();
            this.toggle();
            this._emitChange();
        }
    }

    _onFocus(e) {
        this.dispatchEvent(new CustomEvent('focus', { detail: e }));
    }

    _onBlur(e) {
        this.dispatchEvent(new CustomEvent('blur', { detail: e }));
    }

    _onInputChange(e) {
        // Input change event fires after native click
        // This is a controlled component, but if you rely on the native event:
        // You can handle syncing here. We emit change anyway.
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    toggle() {
        this.checked = !this.checked;
    }

    _emitChange() {
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        this.dispatchEvent(new CustomEvent('checkedChange', {
            detail: this.checked,
            bubbles: true,
            composed: true
        }));
    }

    // Example programmatic methods if needed
    setDisabledState(disabled) {
        this.disabled = disabled;
    }

    writeValue(value) {
        this.checked = !!value;
    }
}

if (customElements.get('slit-round-checkbox') === undefined) {
    customElements.define('slit-round-checkbox', RoundCheckbox);
}