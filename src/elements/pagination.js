import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';

export class Pagination extends SwimlaneElement {

    static get properties() {
        return {
            currentPage: { type: Number },
            totalPages: { type: Number },
            maxDisplayedPageButtons: { type: Number },
        };
    }

    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 1;
        this.maxDisplayedPageButtons = 5;
    }

    static styles = css`
        .pagination {
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
        }

        .pagination button {
            background-color: transparent;
            border: none;
            border-style: none;
            border-radius: 3px;
            color: #9c9c9c;
            cursor: pointer;
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            height: 22px;
            line-height: 22px;
            min-width: 24px;
            padding: 0;
            text-align: center;
            transition: background-color 0.3s ease;
        }

        .pagination button:hover {
            background-color: #455066;
        }

        .pagination button[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .pagination button.active {
            background-color: #455066;
        }

        .icon {
            cursor: pointer;
            margin-right: 0.5em;
            -webkit-font-smoothing: antialiased;
            font-family: ngx-icon;
            font-weight: 400;
        }

        i {
            font-style: normal;
        }

        .icon-prev::before {
            content: "\\eb1a";
        }

        .icon-arrow-left::before {
            content: "\\ea21";
        }

        .icon-arrow-right::before {
            content: "\\ea23";
        }

        .icon-skip::before {
            content: "\\eb4f";
        }
    `;

    render() {
        const pageButtons = this._getPageButtons();

        return html`
            <div class="pagination">

                <button class="icon" 
                    @click=${(e) => this._handlePageChange(1)}
                    ?disabled=${this.currentPage === 1}>
                    <i class="icon-prev"></i>
                </button>

                <button class="icon" 
                    @click=${(e) => this._handlePageChange(this.currentPage - 1)}
                    ?disabled=${this.currentPage === 1}>
                    <i class="icon-arrow-left"></i>
                </button>

                ${pageButtons.map(page => html`
                    <button 
                        class="${this.currentPage === page ? 'active' : ''}"
                        @click=${(e) => this._handlePageChange(page)} 
                        ?disabled=${this.currentPage === page}>
                        ${page}
                    </button>
                `)}

                <button class="icon" 
                    @click=${(e) => this._handlePageChange(this.currentPage + 1)}
                    ?disabled=${this.currentPage === this.totalPages}>
                    <i class="icon-arrow-right"></i>
                </button>

                <button class="icon" 
                    @click=${(e) => this._handlePageChange(this.totalPages)}
                    ?disabled=${this.currentPage === this.totalPages}>
                    <i class="icon-skip"></i>
                </button>

            </div>
        `;
    }

    _getPageButtons() {
        const half = Math.floor(this.maxDisplayedPageButtons / 2);
        let start = Math.max(1, this.currentPage - half);
        let end = Math.min(start + this.maxDisplayedPageButtons - 1, this.totalPages);

        if (end - start + 1 < this.maxDisplayedPageButtons) {
            start = Math.max(1, end - this.maxDisplayedPageButtons + 1);
        }

        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }
        return buttons;
    }

    _handlePageChange(page) {
        this.currentPage = page;
        this._emitPageChange(page);
    }

    _emitPageChange(page) {
        this.dispatchEvent(new CustomEvent('page-changed', { detail: { page } }));
    }
}

if (customElements.get('slit-pagination') === undefined) {
    customElements.define('slit-pagination', Pagination);
}