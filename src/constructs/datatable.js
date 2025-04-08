import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';
import { Button } from '../elements/button.js';
import { Pagination } from '../elements/pagination.js';
import { RoundCheckbox } from '../elements/round-checkbox.js';
import { LoadingSpinner } from '../elements/loading-spinner.js';

export class SlitDataTable extends SwimlaneElement {

    static get properties() {
        return {
            allRecordsChecked: { type: Boolean },
            checkable: { type: Boolean },
            columnNames: { type: Array },
            columnWidths: { type: Object },
            currentPage: { type: Number },
            invertSelections: { type: Boolean },
            isResizing: { type: Boolean },
            loading: { type: Boolean },
            maxDisplayedPageButtons: { type: Number },
            pageData: { type: Array },
            pageSize: { type: Number },
            selectedIds: { type: Object },
            sortColumn: { type: String },
            sortDirection: { type: String },
            totalRows: { type: Number },
        };
    }

    constructor() {
        super();
        this.allRecordsChecked = false;
        this.checkable = true;
        this.columnNames = [];
        this.columnWidths = {};
        this.currentPage = 1;
        this.invertSelections = false;
        this.isResizing = false;
        this.loading = false;
        this.maxDisplayedPageButtons = 5;
        this.pageData = [];
        this.pageSize = 5;
        this.selectedIds = new Set();
        this.sortColumn = '';
        this.sortDirection = 'asc';
        this.totalRows = 0;
    }

    static styles = css`
        .slit-data-table-wrapper {
            margin-right: 0.9em;
            position: relative;
        }
        
        .table-scroll-container {
            overflow-x: auto;
            overflow-y: hidden; 
            width: 100%;
        }

        .table-scroll-container::-webkit-scrollbar {
            height: 8px; 
        }

        .table-scroll-container::-webkit-scrollbar-track {
            background: #1C1E26; 
        }

        .table-scroll-container::-webkit-scrollbar-thumb {
            background: #363D4D;  
            border-radius: 4px; 
        }

        .table-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #525C73;  
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            position: relative;
            padding: 8px;
            color: #cdd2dd;
            background: #313847;
            outline: 1px solid #232837;
        }

        td,
        th {
            border: 1px solid #232837;
            padding: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        td {
            color: white;
        }

        tbody tr:nth-child(even) {
            background-color: #212631;
        }

        tbody tr:nth-child(odd) {
            background-color: #1c2029;
        }

        tbody tr:hover {
            background-color: #171a21;
        }

        th.checkbox-col,
        td.checkbox-col {
            width: 0.1em;
            text-align: center;
        }

        .bottom-row {
            align-items: center;
            color: #9c9c9c;
            display: flex;
            font-size: 13px;
            font-weight: 700;
            justify-content: space-between;
            margin-top: 10px;
        }

        .link-cell {
            cursor: pointer;
        }


        .link-cell::after {
            content: "\\eb07";
            font-family: ngx-icon;
            margin-left: 0.5em;
            font-size: 10px;

        }
  `;

    render() {
        let selectedRowCount = this.allRecordsChecked ? this.totalRows :
            this.invertSelections ? this.totalRows - this.selectedIds.size :
                this.selectedIds.size;
        return html`
            <div class="slit-data-table-wrapper">
                <div>
                    <div class="slit-data-table-content"
                        style="min-height: ${this.calculateMinHeight()}; opacity: ${this.loading ? 0.5 : 1}">
                        <div class="table-scroll-container">
                            <table>
                                <thead>
                                    <tr>
                                        ${this.checkable ? html`

                                        <th class="checkbox-col" style="text-align:center;">
                                        <slit-round-checkbox
                                            .checked=${this.allRecordsChecked}
                                            @checkedChange=${this.handleHeaderCheckboxChange}></slit-round-checkbox>
                                        </th>
                                        ` : ''}
                                        ${this.columnNames.map(col => html`
                                        <th style="width: ${this.columnWidths[col] || 150}px">
                                            ${col}
                                        </th>
                                        `)}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.pageData.map(row => html`
                                    <tr>
                                        ${this.checkable ? html`
                                        <td class="checkbox-col">
                                        <slit-round-checkbox
                                                .checked=${!this.invertSelections && this.selectedIds.has(row.id) ||
                                                            this.invertSelections && !this.selectedIds.has(row.id) ||
                                                            this.allRecordsChecked
                                                            } 
                                                @change=${e =>this.handleCheckboxChange(e, row.id)}></slit-round-checkbox>
                                        </td>
                                        ` : ''}
                                        ${this.columnNames.map(col => {
                        const linkCell = (col === 'Tracking Id') && !!row.url;

                        return html`
                                            <td
                                            class="${linkCell ? 'link-cell' : ''}"
                                            @click=${linkCell ? () => this.handleRowClick(row) : undefined}
                                            >
                                            ${this.getColumnValue(row, col)}
                                            </td>
                                        `;
                    })}
                                    </tr>
                                    `)}
                                </tbody>
                            </table>
                        </div>
                        <div class="bottom-row">
                            <div>${selectedRowCount} selected / ${this.totalRows} total</div>
                            <slit-pagination
                                .currentPage=${this.currentPage}
                                .totalPages=${Math.ceil(this.totalRows / this.pageSize)}
                                .maxDisplayedPageButtons=${this.maxDisplayedPageButtons}
                                @page-changed=${(e) => this.changePage(e.detail.page)}>
                            </slit-pagination>
                        </div>
                        <loading-spinner 
                            .display="${this.loading}">
                        </loading-spinner>
                    </div>
                </div>
            </div>
        `;
    }

    calculateMinHeight() {
        const rowHeight = 39.2;
        return `${(this.pageSize * rowHeight) + 39.2}px`;
    }

    getColumnValue(row, col) {
        if (col === 'id' || col === 'url' || col === 'checked') {
            return row[col] || '';
        }
        return row.values[col] || '';
    }

    changePage(pageNumber) {

        this.dispatchEvent(new CustomEvent('page-changed', { detail: { pageNumber } }));


    }

    handleCheckboxChange(e, rowId) {

        if (e.target.checked) {

            if (this.invertSelections) {

                this.selectedIds.delete(rowId);

                if (this.selectedIds.size === 0) {

                    this.invertSelections = false;

                    this.allRecordsChecked = true;
                }
            }
            else {

                this.selectedIds.add(rowId);
            }
        }
        else {

            if (this.allRecordsChecked) {

                this.allRecordsChecked = false;

                this.invertSelections = true;

                this.selectedIds.clear();

                this.selectedIds.add(rowId);
            }
            else {

                if (this.invertSelections) {

                    this.selectedIds.add(rowId);
                }
                else {

                    this.selectedIds.delete(rowId);
                }
            }
        }

        this.dispatchEvent(new CustomEvent('row-checked', {
            detail: {
                selectedIds: Array.from(this.selectedIds),
                allRecordsChecked: this.allRecordsChecked,
                invertSelections: this.invertSelections
            }
        }));

        this.requestUpdate();
    }

    handleHeaderCheckboxChange(e) {

        const checked = e.target.checked;

        this.selectedIds.clear();

        if (checked) {

            this.invertSelections = false;

            this.allRecordsChecked = true;

            this.pageData.forEach(row => {

                this.selectedIds.add(row.id);
            });
        }
        else {

            this.allRecordsChecked = false;
        }

        this.dispatchEvent(new CustomEvent('row-checked', {
            detail: {
                selectedIds: Array.from(this.selectedIds),
                allRecordsChecked: this.allRecordsChecked,
                invertSelections: this.invertSelections
            }
        }));

        this.requestUpdate();
    }

    handleRowClick(row) {
        if (row.url) {
            window.open(row.url, OPEN_NEW_TAB ? '_blank' : '_self');
        }
    }
}

if (customElements.get('slit-data-table') === undefined) {
    customElements.define('slit-data-table', SlitDataTable);
}