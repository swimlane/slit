import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class ConditionalDisplaySection extends SwimlaneElement {

    static get properties() {
        return {
            displayContents: { type: Boolean },
            width: { type: String }
        };
    }

    constructor() {
        super();
        this.displayContents = false;
        this.width = "100%";
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('width')) {
            this.style.setProperty('--section-width', this.width);
        }
        if (changedProperties.has('displayContents')) {
            this._updateHeight();
        }
    }

    static get styles() {
        return css`
            .display-section {
                width: var(--section-width, 100%);
                display: flex;
                flex-direction: row;
                overflow: hidden;
                background: transparent;
                border: none;
                opacity: 0;
                max-height: 0;
                transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, padding-top 0.5s ease-in-out, padding-bottom 0.5s ease-in-out;
                column-gap: 10px;
                padding-left: 1em;
                padding-right: 1em;
                padding-top: 0;
                padding-bottom: 0;
            }

            .display-section.visible {
                opacity: 1;
                max-height: 500px;
                padding-top: 1em;
                padding-bottom: 1em;
            }
        `;
    }

    render() {
        return html`
            <div class="display-section">
                <slot></slot>
            </div>
        `;
    }

    _updateHeight() {

        const section = this.shadowRoot.querySelector('.display-section');

        if (this.displayContents) {
            section.classList.add('visible');
            section.style.maxHeight = section.scrollHeight + 'px';
            setTimeout(() => {
                section.style.maxHeight = 'auto';
            }, 500);
        } else {
            section.style.maxHeight = section.scrollHeight + 'px';
            requestAnimationFrame(() => {
                section.classList.remove('visible');
                section.style.maxHeight = '0';
            });
        }
    }
}

if (customElements.get('slit-conditional-display-section') === undefined) {
    customElements.define('slit-conditional-display-section', ConditionalDisplaySection);
}