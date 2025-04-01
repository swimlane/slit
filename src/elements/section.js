import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class SectionComponent extends SwimlaneElement {

    static properties = {
        sectionCollapsed: { type: Boolean },
        sectionCollapsible: { type: Boolean },
        headerToggle: { type: Boolean },
        sectionTitle: { type: String },
        width: { type: String },
        enabled: { type: Boolean },
        marginBottom: { type: String },
        float: { type: Boolean }
    };

    constructor() {
        super();
        this.sectionCollapsed = false;
        this.sectionCollapsible = true;
        this.headerToggle = false;
        this.sectionTitle = '';
        this.width = '100%';
        this.enabled = true;
        this.marginBottom = '1em';
        this.float = false;
    }

    updated(changedProperties) {

        super.updated(changedProperties);

        if (changedProperties.has('width')) {

            this.style.setProperty('--section-width', this.width);
        }
        if (changedProperties.has('marginBottom')) {

            this.style.setProperty('--section-margin-bottom', this.marginBottom);
        }
        if (changedProperties.has('enabled')) {

            if (!this.enabled && !this.sectionCollapsed) {

                this.sectionCollapsed = true;
            }
        }
    }

    static styles = css`
        .slit-section-container {
            width: var(--section-width, 100%);
            background: #212631;
            border-radius: 0;
            border-style: solid;
            border-width: 2px;
            border: #313847;
            box-sizing: border-box;
            color: rgb(222, 226, 234);
            display: block;    
            margin-right: 10px;
            margin-top: 10px;
            margin-bottom: var(--section-margin-bottom, 1em);
            position: relative;
        }

        .slit-section-container .slit-section-header {
            background: #313847;
            color: #cdd2dd;
            cursor: pointer;
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            position: relative;
            width: auto;
        }

        .disabled {
            cursor: not-allowed !important;
            pointer-events: none;
            opacity: .5;
        }

        .slit-section-container .slit-section-header h1 {
            font-size: 1.1em;
            font-weight: 600;
            line-height: 40px;
            margin: 0;
            padding: 0;
        }
        
        .slit-section-not-collapsible {
            cursor: pointer;
        }

        .slit-section-toggle {
            background: none;
            border: none;
            color: #cdd2dd;
            cursor: pointer;
            display: inline-block;
            font-size: 8px;
            font-weight: 900;
            left: 5px;
            line-height: 40px;
            padding: 0 10px;
            transition: transform 0.25s ease-in-out;
            vertical-align: top;
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

        .slit-arrow-right::before {
            content: "\\ea23";
        }

        .slit-arrow-down::before {
            content: "\\ea1f";
        }

        .slit-section-content {
            display: flex;    
            border: .15em solid #313847;
            border-radius: 4px;
            padding: 1em;
            height: auto;
            overflow: hidden;
            transition: height 0.25s ease-in-out, opacity 0.25s ease-in-out;
        }

        .collapsed {
            height: 0;
            opacity: 0;
            padding: 0;
            visibility: hidden;
        }

        .expanded {
            height: auto;
            opacity: 1;
            visibility: visible;
        }

        /* Floating style */
        .floating {
            position: absolute;
            background: rgba(33, 38, 49, 0.95);
            z-index: 10;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            width: inherit; 
            left: 0;
        }

        button {
            text-shadow: 1px 1px rgba(0, 0, 0, .07)
        }

        button:active,
        button:focus {
            outline: none
        }

        button:focus-visible,
        button.focus-visible {
            outline: -webkit-focus-ring-color auto 1px
        }    
    `;

    render() {
        const disabled = this.enabled ? '' : 'disabled';
        const contentClass = `
            slit-section-content 
            ${this.sectionCollapsible && this.sectionCollapsed ? 'collapsed' : 'expanded'} 
            ${this.float ? 'floating' : ''}
        `;

        return html`
        <div class="slit-section-container">
            <div class="slit-section-header 
                ${this.sectionCollapsible ? '' : 'slit-section-not-collapsible'} 
                ${this.sectionCollapsed ? 'section-collapsed' : ''}
                ${disabled}"
                @click="${(e) => this.toggleSection(e)}">
                    ${this.sectionCollapsible ? html`
                        <button class="slit-section-toggle ${disabled}">
                            <i class="slit-icon ${this.sectionCollapsed ? 'slit-arrow-right' : 'slit-arrow-down'}"></i>
                        </button>` : ''}
                    ${this.sectionTitle ? html`<h1>${this.sectionTitle}</h1>` : ''}
            </div>
            <div class="${contentClass}"
                style="display: flex; flex-wrap: wrap;">
                <slot></slot>
            </div>
        </div>
        `;
    }

    toggleSection() {
        if (this.sectionCollapsible && this.enabled) {
            this.sectionCollapsed = !this.sectionCollapsed;
            this.dispatchEvent(new CustomEvent('toggle', { detail: this.sectionCollapsed }));
        }
    }
}

if (customElements.get('slit-section-component') === undefined) {
    customElements.define('slit-section-component', SectionComponent);
}