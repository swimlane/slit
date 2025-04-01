import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class Textbox extends SwimlaneElement {

    /*

    <slit-textbox 
        emitOnKeystroke=${false} 
        enabled=${true} 
        label="Enter Something" 
        placeholder="put stuff here"
        tooltip="some details"
        .value=${this.value}
        width="${'100%'}"
        @value-changed=${e => this.doSomething()}>
    </slit-textbox>
    
    */

    static get properties() {
        return {
            emitOnKeystroke: { type: Boolean },
            enabled: { type: Boolean },
            label: { type: String },
            placeholder: { type: String },
            tooltip: { type: String },
            value: { type: String },
            width: { type: String },
        };
    }

    constructor() {
        super();
        this.enabled = true;
        this.placeholder = 'Enter text here';
        this.emitOnKeystroke = false;
        this.value = '';
        this.width = '25%';
        this.label = '';
        this.tooltip = '';
    }

    updated(changedProperties) {

        super.updated(changedProperties);

        if (changedProperties.has('width')) {

            this.style.setProperty('--text-input-width', this.width);
        }
    }

    static styles = css`
        :host {
            display: block;
            width: var(--text-input-width, 100%);
        }
        .slit-textbox-container {
            padding: 0.2em;
            margin: 0.2em;
        }
        .slit-textbox-label {
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
        .slit-textbox-container:focus-within .slit-textbox-label {
            color: #1483ff;
        }
        .slit-textbox-input {
            background-color: transparent;
            box-sizing: border-box;
            outline: none;
            border: none;
            color: #ebedf2;
            caret-color: #1483ff;
            cursor: pointer;
            font-family: "Source Sans Pro", "Open Sans", Arial, sans-serif;
            padding: 8px;
            width: 100%;
            overflow-y: auto;
            line-height: 18.2px;
        }
        .slit-textbox-input:disabled {
            background-color: transparent;
            cursor: not-allowed !important;
            pointer-events: none;
        }
        .slit-textbox-input::placeholder {
            color: #818fa9;
        }
        .slit-textbox-bottom-border {
            height: 1px;
            width: 100%;
            background-color: #455066;
            transition: width .25s ease-out;
        }
        .slit-textbox-container:focus-within .slit-textbox-bottom-border {
            width: 100%;
            background-color: #1483ff;
        }
        
        .slit-textbox-bottom-border.disabled {
            background-color: transparent;
        }
    
    `;

    render() {

        let disabled = this.enabled ? '' : 'disabled';

        return html`
        <div class="slit-textbox-container">
          ${this.label
                ? html`<label class="slit-textbox-label" for="text-input">${this.label}</label>`
                : ''}
        <input class="slit-textbox-input"
          type="text"
          .value=${this.value}
          ?disabled=${!this.enabled}
          placeholder=${this.placeholder}
          @input=${(e) => this._onInput(e)}
          @blur=${(e) => this._onBlur(e)}
        />
        <div class="slit-textbox-bottom-border ${disabled}"></div>
        </div>
      `;
    }

    _onInput(event) {
        this.value = event.target.value;
        if (this.emitOnKeystroke) {
            this._emitValue();
        }
    }

    _onBlur() {
        if (!this.emitOnKeystroke) {
            this._emitValue();
        }
    }

    _emitValue() {
        const customEvent = new CustomEvent('value-changed', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }

}

if (customElements.get('slit-textbox') === undefined) {
    customElements.define('slit-textbox', Textbox);
}