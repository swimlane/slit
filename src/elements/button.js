import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class Button extends SwimlaneElement {
    /*
    <slit-button 
        buttonAlignment=""
        buttonSize=""
        containerSize=""
        text="Remove Selected"
        theme="Bordered"
        .state=${this.removeRecordsStatus} 
        emitEventName="remove-button-clicked" 
        @remove-button-clicked=${(e) => {
            this.removeRecordsStatus = "InProgress"
            this.handleRemoveButtonClick();
        }}>
    </slit-button>
     */

    static get styles() {
        return [super.styles,
        css`
      button,
      .btn,
      .slit-button button {
          box-sizing: border-box;
          color: inherit;
          cursor: pointer;
          display: inline-block;
          position: relative;
          text-align: center;
          text-decoration: none;
          user-select: none;
          font: inherit;
          background: transparent;
          border: none;
      }
  
      button {
          color: inherit;
          text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
      }
  
      button:active,
      button:focus,
      .btn:focus,
      .slit-button button:focus,
      .slit-button button:focus-within {
          outline: none;
      }
  
      button:focus-visible,
      button.focus-visible,
      .btn:focus-visible,
      .btn.focus-visible,
      .slit-button button:focus-visible {
          outline: -webkit-focus-ring-color auto 1px;
          outline: 2px solid #485671;
      }
  
      /* Default button */
      .btn,
      .slit-button.btn {
          color: white;
          padding: 0.35em 0.55em;
          font-size: 13px;
          font-weight: bold;
          outline-offset: 1px;
          line-height: 1.15em;
          border-radius: 2px;
          transition: background-color 200ms, box-shadow 200ms;
      }
  
      .btn {
          background: #607d8b;
          border: solid 1px transparent;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
      }
  
      .btn .ngx-icon,
      .btn .icon,
      .slit-button .state-icon .icon {
          font-weight: normal;
          vertical-align: middle;
          line-height: 1em;
          font-size: 13px;
      }
  
      .btn .icon.has-text,
      .btn .icon.has-text-right {
          margin-right: 0.2em;
      }
  
      .btn .icon.has-text-left {
          margin-left: 0.2em;
      }
  
      .btn::-moz-focus-inner,
      .slit-button button>.content {
          border: 0;
          padding: 0;
      }
  
      .slit-button button>.content {
          text-overflow: ellipsis;
          overflow-x: clip;
          overflow-y: visible;
          width: 100%;
          display: block;
          white-space: nowrap;
      }
  
      /* Button hover/focus/active */
      .btn:hover:not([disabled]),
      .btn:hover:not(.disabled),
      .btn.focus-hover:not([disabled]),
      .btn.focus-hover:not(.disabled),
      .slit-button:hover {
          background: #455a64;
          outline-color: #455a64;
      }
  
      /* Primary button variant */
      .btn.btn-primary {
          background-color: #42a5f5;
          outline-color: #1e88e5;
      }
  
      .btn.btn-primary.btn-primary-gradient {
          background: linear-gradient(350.57deg, #1e88e5 14.42%, #03a9f4 100%);
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
          border: 1px solid #1e88e5;
      }
  
      /* Warning, danger, and link button variants */
      .btn.btn-warning {
          background-color: #ffb74d;
          color: #263238;
          outline-color: #ff9800;
      }
  
      .btn.btn-danger,
      .slit-button.btn-danger button {
          background-color: #e57373;
          outline-color: #ff6131;
      }
  
      .btn.btn-link,
      .slit-button.btn-link {
          background-color: transparent;
          box-shadow: none;
      }
  
      /* Bordered button */
      .btn.btn-bordered,
      .slit-button.btn-bordered,
      .btn.btn-primary.btn-bordered,
      .slit-button.btn-primary.btn-bordered {
          border: 1px solid #42a5f5;
          color: #42a5f5;
          background-color: transparent;
          box-shadow: none;
          outline-color: #42a5f5;
      }
  
      .btn.btn-default.btn-bordered,
      .slit-button.btn-default.btn-bordered {
          border: 1px solid white;
          color: white;
      }
  
      .btn.btn-default.btn-bordered:hover {
          border-color: #1e88e5 !important;
          color: #1e88e5 !important;
      }
  
      .btn.btn-file,
      .slit-button.btn-file {
          padding: 0;
      }
  
      .btn.btn-file label {
          display: block;
          padding: 0.35em 0.75em;
      }
  
      .btn.btn-file[disabled] label {
          cursor: not-allowed;
      }
  
      .btn.btn-file input[type='file'],
      .slit-button.btn-file input[type='file'] {
          pointer-events: none;
          position: absolute;
          left: -9999px;
      }
  
      .slit-button.disabled-button,
      .btn.disabled-button {
          pointer-events: none;
      }
  
      /* States: success, fail, in-progress */
      .slit-button.success,
      .slit-button.fail {
          color: black !important;
      }
  
      .slit-button.in-progress {
          color: white !important;
      }
  
      .slit-button.success {
          background-color: #1ddeb6 !important;
          border: 1px solid #1ddeb6 !important;
      }
  
      .slit-button.fail {
          background-color: #ff4514 !important;
          border: 1px solid #ff4514 !important;
      }
  
      .slit-button.in-progress,
      .slit-button.success,
      .slit-button.fail {
          pointer-events: auto;
          cursor: wait !important;
          opacity: 1 !important;
      }
  
      .slit-button.in-progress button,
      .slit-button.success button,
      .slit-button.fail button {
          opacity: 1;
      }
  
      .slit-button.in-progress:active,
      .slit-button.success:active,
      .slit-button.fail:active,
      .slit-button.in-progress *,
      .slit-button.success *,
      .slit-button.fail * {
          pointer-events: none;
      }
  
      .slit-button.in-progress .content,
      .slit-button.success .content,
      .slit-button.fail .content {
          opacity: 0;
          transition: opacity 0.25s ease-out;
      }
  
      .slit-button.in-progress.active .content,
      .slit-button.success.active .content,
      .slit-button.fail.active .content {
          opacity: 1;
      }
  
      .slit-button.in-progress .state-icon,
      .slit-button.success .state-icon,
      .slit-button.fail .state-icon {
          position: absolute;
          display: inline-block;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }
  
      .slit-button.in-progress .state-icon .icon,
      .slit-button.success .state-icon .icon,
      .slit-button.fail .state-icon .icon {
          height: 1em;
          width: 1em;
          font-weight: bold;
          color: white;
      }
  
      .ngx-icon {
          display: none;
          flex-shrink: 0
      }
      .ngx-icon.visible {
        
          display: inline-block;
      }
  
      .ngx-icon,
      [class*=icon-]:before,
      [class^=icon-]:before {
          font: normal normal normal 1em/1 ngx-icon;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale
      }
  
      [class*=icon-]:before,
      [class^=icon-]:before {
          line-height: 1
      }
  
      .ngx-icon.ngx-loading::before {
          content: "\\eaf1"
      }
  
      .icon-fx-spinning {
          animation: spin 1s infinite linear;
          display: inline-block;
          font-size: 1em;
          line-height: 1em;
          height: 1em;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
      .ngx-icon.ngx-check::before {
          content: "\\ea58"
      }
  
      .ngx-icon.ngx-x::before {
          content: "\\eba3"
      }
      `
        ]
    }

    static get properties() {
        return {
            buttonAlignment: { type: String },
            buttonSize: { type: String },
            containerSize: { type: String },
            text: { type: String },
            theme: { type: String },
            themeClass: { type: Array },
            state: { type: String }
        };
    }

    constructor() {
        super();
        this.text = 'Click me';
        this.theme = 'Default';
        this.themeClass = ['btn-default'];
        this.containerSize = '';
        this.buttonSize = '';
        this.buttonAlignment = '';
        this.state = 'Active';
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('theme')) {
            this._updateThemeClass();
        }
        if (changedProperties.has('state')) {
            this._updateStateIcons();
        }
    }

    render() {
        return html`
          <div
            class="slit-button btn ${this.themeClass.join(' ')} ${this.buttonStateClass}"
            style="width: ${this.containerSize || 'auto'};"
          >
            <button
              class="${this.state === 'Disabled' ? 'disabled-button' : ''}"
              style="width: ${this.buttonSize || 'auto'}; text-align: ${this.buttonAlignment || 'center'};"
              @click=${(e) => this.handleButtonClick(e)}
            >
              <span class="content">${this.text}</span>
              <span class="state-icon">
                <span class="ngx-icon ngx-loading ${this.inProgressState}"></span>
                <span class="ngx-icon ngx-check ${this.successState}"></span>
                <span class="ngx-icon ngx-x ${this.failState}"></span>
              </span>
            </button>
          </div>
        `;
    }

    _updateThemeClass() {
        const themes = {
            Default: ['btn-default'],
            Primary: ['btn-primary'],
            PrimaryGradient: ['btn-primary', 'btn-primary-gradient'],
            Warning: ['btn-warning'],
            Danger: ['btn-danger'],
            Bordered: ['btn-primary', 'btn-bordered'],
        };
        this.themeClass = themes[this.theme] || themes['Default'];
    }

    _updateStateIcons() {
        this.buttonStateClass = '';
        this.inProgressState = '';
        this.successState = '';
        this.failState = '';


        switch (this.state) {
            case 'InProgress':
                this.buttonStateClass = 'in-progress';
                this.inProgressState = 'visible icon-fx-spinning';
                break;
            case 'Success':
                this.buttonStateClass = 'in-progress';
                this.successState = 'visible';
                this._resetState();
                break;
            case 'Fail':
                this.buttonStateClass = 'in-progress';
                this.failState = 'visible';
                this._resetState();
                break;
            case 'Disabled':
                // TODO reconsider what is happening here and in default.
                this.disabled = true;
                console.error('Invalid state value. Defaulted to Disabled.');
                break;
            default:
                console.log('default')
                this.state = 'Active';
        }
        this.requestUpdate();
    }

    _resetState() {
        setTimeout(() => {
            this.state = 'Active';
        }, 5000)
    }

    handleButtonClick(event) {

        const customEvent = new CustomEvent('button-clicked', {
            detail: { state: "InProgress" },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(customEvent);
    }
}

if (!customElements.get('slit-button')) {
  customElements.define('slit-button', Button);
}
