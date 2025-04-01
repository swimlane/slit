import { SwimlaneElement, html, css } from '@swimlane/swimlane-element@2';
import { SlitDropdownMenu } from '../elements/dropdown-menu.js';
import { SlitTextbox } from '../elements/textbox.js';
import { SlitButton } from '../elements/button.js';

export class FilterContainer extends SwimlaneElement {

    static styles = css`
            :host {
                align-items: center;
                width: var(--component-width, 100%);
                padding: 0.5em;
                margin: 0.5em;
                box-sizing: border-box; 
            }
            .all-filters-container{
                display: block;
                width: 100%;
            }
            .single-filter-container{
                display: flex;
                width: 100%;
            }
            .buttons-container{
                display: flex;
                width: 100%;
                padding-top: 1em;
                padding-bottom: 1em;
                column-gap: 1em;
            }
            .placeholder {
                display: flex;
                flex-grow: 1;
                padding-left: 0.5em; 
            }
            .slit-filter-remove-button{
                padding-bottom: 2em;
                padding-right: 2em;
                padding-top: 2em;
            }
            .icon {
                cursor: pointer;
                margin-right: 0.5em;
                -webkit-font-smoothing: antialiased;
                font-family: ngx-icon;
                font-size: 1.5em;
                font-weight: 400;
            }
            .action-close:before {
                content: "\\eba3";
                color: #838FA7;
            }
        `;

    static get properties() {
        return {
            columnNames: { type: Array },
            comparisonOptions: { type: Array },
            enabled: { type: Boolean },
            filters: { type: Array },
            index: { type: Number },
            schema: { type: Array },
            width: { type: String },
            validFilters: { type: Array }
        };
    }

    constructor() {
        super();
        this.columnNames = [];
        this.enabled = true;
        this.filters = [{
            columnName: '',
            comparison: '',
            value: '',
            fieldType: 'text',
            fieldValues: [],
            comparisonOptions: [
                'equals', 'doesNotEqual', 'contains', 'excludes',
                'greaterThan', 'greaterThanOrEqual',
                'lessThan', 'lessThanOrEqual'
            ]
        }];
        this.index = 0;
        this.schema = [];
        this.width = '25%';
        this.validFilters = [];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('width')) {
            const validWidths = ['25%', '50%', '75%', '100%'];
            if (validWidths.includes(this.width)) {
                this.style.setProperty('--component-width', this.width);
            } else {
                this.style.setProperty('--component-width', '100%');
            }
        }
    }

    render() {

        return html`
            <div class="all-filters-container">
                ${this.filters.map((filter, index) => html`
                <div class="single-filter-container">
                    <slit-dropdown-menu label="Filter column" 
                        placeholder="Select column to filter by..." 
                        .enabled=${true}
                        .multiSelect=${false} 
                        .width=${'30%'} 
                        .values=${this.schema.map((el) => { return el.name })} 
                        .selectedValue=${filter.columnName}
                        @selection-changed=${(e) => { this.updateFilter(index, 'columnName', e.detail._selectedValue) }}>
                    </slit-dropdown-menu>

                    <slit-dropdown-menu label="Filter operation" 
                        placeholder="Select method to filter by..." 
                        .enabled=${true}
                        .multiSelect=${false} 
                        .width=${'30%'} 
                        .values=${filter.comparisonOptions} 
                        .selectedValue=${filter.comparison}
                        @selection-changed=${(e) => this.updateFilter(index, 'comparison', e.detail._selectedValue)}>
                    </slit-dropdown-menu>
                    
                    ${filter.fieldType === 'valuesList'
                ? html`
                            <slit-dropdown-menu 
                                label="Filter value" 
                                .enabled=${true}
                                .multiSelect=${false}
                                .width=${'30%'}
                                .values=${filter.fieldValues}
                                .selectedValue=${filter.value}
                                @selection-changed=${(e) => this.updateFilter(index, 'value', e.detail._selectedValue)}>
                            </slit-dropdown-menu>
                        `
                : html`
                            <slit-textbox 
                                label="Filter value" 
                                .enabled=${true} 
                                .width=${'30%'} 
                                .value=${filter.value}
                                @value-changed=${(e) => this.updateFilter(index, 'value', e.detail.value)}>
                            </slit-textbox>
                        `}
                    <div class="slit-filter-remove-button">
                        <div class="icon" @click="${() => this.removeFilter(index)}">
                            <div class="action-close"></div>
                        </div>
                    </div>
                </div>
                `)}
            </div>
            <div class="buttons-container">

                <slit-button theme="Bordered" 
                    text="Add Filter" 
                    @button-clicked=${(e) => this.addFilter(e)}>
                </slit-button>

                <slit-button theme="Primary" 
                    text="Apply Filters" 
                    @button-clicked=${(e) => this.applyFilters(e)}>
                </slit-button>

                ${this.validFilters && this.validFilters.length > 0 ? html`
                    <slit-button theme="Bordered" 
                        text="Clear Filters" 
                        @button-clicked=${(e) => this.clearFilters(e)}>
                    </slit-button>
                ` : ''}

            </div>
        `;
    }

    updateFilter(index, key, value) {
        this.filters[index][key] = value;

        if (key === 'columnName') {
            const selectedColumnName = value;
            const columnSchema = this.schema.find((col) => col.name === selectedColumnName);

            let newOptions;
            if (columnSchema && columnSchema.fieldType === 'text') {

                newOptions = ['equals', 'doesNotEqual', 'contains', 'excludes'];
                this.filters[index].fieldType = 'text';
                this.filters[index].fieldValues = [];
            }
            else if (columnSchema && columnSchema.fieldType === 'tracking') {

                newOptions = ['equals', 'doesNotEqual', 'contains', 'excludes'];
                this.filters[index].fieldType = 'tracking';
                this.filters[index].fieldValues = [];
            }
            else if (columnSchema && columnSchema.fieldType === 'valuesList') {

                newOptions = ['equals', 'doesNotEqual'];
                this.filters[index].fieldType = 'valuesList';

                const schemaValues = (columnSchema.values || []).map(v => v.name);
                this.filters[index].fieldValues = schemaValues;
            } else {

                newOptions = [
                    'equals', 'doesNotEqual', 'contains', 'excludes',
                    'greaterThan', 'greaterThanOrEqual',
                    'lessThan', 'lessThanOrEqual'
                ];
                this.filters[index].fieldType = 'text';
                this.filters[index].fieldValues = [];
            }


            this.filters[index].comparisonOptions = newOptions;

            this.filters[index].comparison = '';
            this.filters[index].value = '';
        }

        this.requestUpdate();
    }

    removeFilter(index) {
        if (this.filters.length > 0) {
            this.filters.splice(index, 1);
        }
        if (this.filters.length === 0) {
            this.filters = [{
                columnName: '',
                comparison: '',
                value: '',
                fieldType: 'text',
                fieldValues: [],
                comparisonOptions: [
                    'equals', 'doesNotEqual', 'contains', 'excludes',
                    'greaterThan', 'greaterThanOrEqual',
                    'lessThan', 'lessThanOrEqual'
                ]
            }];
        }

        this.requestUpdate();
    }

    addFilter() {
        this.filters.push({
            columnName: '',
            comparison: '',
            value: '',
            fieldType: 'text',
            fieldValues: [],
            comparisonOptions: [
                'equals', 'doesNotEqual', 'contains', 'excludes',
                'greaterThan', 'greaterThanOrEqual',
                'lessThan', 'lessThanOrEqual'
            ]
        });
        this.requestUpdate();
    }


    applyFilters() {
        let validFilters = this.filters.filter(filter => filter.columnName && filter.comparison && filter.value)
        if (validFilters && validFilters.length > 0) {
            this.validFilters = validFilters;

            const customEvent = new CustomEvent('filters-applied', {
                detail: { filters: this.validFilters },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(customEvent);
        }
        else {
            console.warn('No valid filters');
        }

    }
    clearFilters() {
        this.filters = [{
            columnName: '',
            comparison: '',
            value: '',
            fieldType: 'text',
            fieldValues: [],
            comparisonOptions: [
                'equals', 'doesNotEqual', 'contains', 'excludes',
                'greaterThan', 'greaterThanOrEqual',
                'lessThan', 'lessThanOrEqual'
            ]
        }];
        this.validFilters = [];
        this.requestUpdate();

        const customEvent = new CustomEvent('filters-applied', {
            detail: { filters: [] },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }

}

if (customElements.get('slit-filter-container') === undefined) {
    customElements.define('slit-filter-container', FilterContainer);
}