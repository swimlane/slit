import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class LoadingSpinner extends SwimlaneElement {

    static get properties() {
        return {
            message: { type: String },
            display: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.message = '';
        this.display = true;
    }

    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => this.updateCanvasDimensions(), 0);
    }

    updated(changedProperties) {
        if (changedProperties.has('display')) {
            this.style.setProperty('--display-loading-spinner', this.display ? 'block' : 'none');
        }
    }

    static get styles() {
        return [
            css`
                :host {
                    display: var(--display-loading-spinner, block);
                }

                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    top: var(--loading-spinner-top, 0px);
                    left: var(--loading-spinner-left, 0px);
                    width: var(--loading-spinner-width, 90%);
                    height: var(--loading-spinner-height, 100%);
                    position: var(--loading-spinner-position, absolute);
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .lds-ellipsis,
                .lds-ellipsis div {
                    box-sizing: border-box;
                }

                .lds-ellipsis {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .lds-ellipsis div {
                    position: absolute;
                    top: 33.33333%;
                    width: 13.33333%;
                    height: 13.33333%;
                    border-radius: 50%;
                    background: currentColor;
                    animation-timing-function: cubic-bezier(0, 1, 1, 0);
                }

                .lds-ellipsis div:nth-child(1) {
                    left: 8px;
                    animation: lds-ellipsis1 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(2) {
                    left: 8px;
                    animation: lds-ellipsis2 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(3) {
                    left: 32px;
                    animation: lds-ellipsis2 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(4) {
                    left: 56px;
                    animation: lds-ellipsis3 0.6s infinite;
                }

                @keyframes lds-ellipsis1 {
                    0% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes lds-ellipsis3 {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(0);
                    }
                }

                @keyframes lds-ellipsis2 {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(24px, 0);
                    }
                }
            `
        ];
    }

    render() {
        return html`
            <div class="container">
                <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        this.updateCanvasDimensions();
    }

    updateCanvasDimensions() {

        const parent = this.getRootNode().host || this.parentElement;
        if (parent) {
            //console.log('parent exists')
            let corner = this.shadowRoot.querySelector('th.checkbox-col');
            if (!corner) {
                //console.log('corner doesnt exist')
                corner = parent;
            }
            const rect = corner.getBoundingClientRect();
            //console.log(rect);
            this.style.setProperty('--loading-spinner-top', `${40}px`);
            this.style.setProperty('--loading-spinner-width', `${rect.width - 20}px`);
            this.style.setProperty('--loading-spinner-height', `${rect.height - 73}px`);
            this.style.setProperty('--loading-spinner-position', 'absolute');

        }
    }

}

if (customElements.get('loading-spinner') === undefined) {
    customElements.define('loading-spinner', LoadingSpinner);
}