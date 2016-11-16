import _ from 'lodash';
import myAjax from './my-ajax';

myAjax(handleRequest, 'logs/speedtest.json', 'GET');

const dataz = {};
const sortConfig = {
    type: 'ascending',
    index: 2
};

function handleRequest(http) {
    if (http.status == 200) {
        dataz.response = http.response;
        renderElements();
    } else if (http.status == 400) {
        console.log('aww :(');
    } else {
        console.log('wtf?? >:(');
    }
}

function renderElements() {
    const order = [
        {
            title: 'Time',
            type: 'time',
            query: ['date', 'iso'],
            sortQuery: ['date', 'epoch']
        },
        {
            title: 'Ping',
            type: 'ping',
            query: ['data', 'ping']
        },
        {
            title: 'Download',
            type: 'download',
            query: ['data', 'download']
        },
        {
            title: 'Upload',
            type: 'upload',
            query: ['data', 'upload']
        }
    ];
    renderSortConfig(order, sortConfig);
    renderTable(dataz.response, order, sortConfig);
    bindEventHandlers();
}

function bindEventHandlers() {
    clickSort('.sort-control');
}

function clickSort(selector) {
    let elements = document.querySelectorAll(selector);
    for(let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.addEventListener('touchstart', sortItems, false);
        element.addEventListener('click', sortItems, false);
    }
}

function sortItems() {
    let index = this.dataset.index;
    if(sortConfig.index === index) {
        if(sortConfig.type === 'ascending') {
            sortConfig.type = 'descending';   
        } else {
            sortConfig.type = 'ascending';   
        }
    } else {
        sortConfig.type = 'ascending';
    }

    sortConfig.index = index;
    renderElements();
}

function sortData(response, order, sortConfig={type: 'ascending', index: 0}) {
    // favor sort query if it exists
    const sortQuery = order[sortConfig.index].sortQuery || order[sortConfig.index].query;
    return response.sort((a, b) => {
        const aValue = parseFloat(_.get(a, sortQuery));
        const bValue = parseFloat(_.get(b, sortQuery));

        if(sortConfig.type === 'ascending') {
            if(aValue > bValue) return 1;
            if(bValue > aValue) return -1;
        }
        if(sortConfig.type === 'descending') {
            if(aValue < bValue) return 1;
            if(bValue < aValue) return -1;
        }
        return 0;
    });
}

function renderSortConfig(order, sortConfig) {
    const orderTitle = order[sortConfig.index].title;
    const sortType = sortConfig.type;

    const sortConfigElement = document.getElementById('table-sort-config');
    sortConfigElement.innerHTML = `Sorty By: ${ orderTitle } | ${ sortType }`;
}

function tableBodyParser(response, order) {
    return response.map((row) => {
        // throw out rows that are incomplete
        if(Object.keys(row.data).length ===  order.length - 1) {
            return order.map((item) => {
                const itemContent = _.get(row, item.query);
                if(itemContent) return itemContent;
            });
        }
    });
}

function renderTable(response, order, sortConfig) {
    const responseData = sortData(JSON.parse(response), order, sortConfig);

    const tableHeader = renderTableHeader(order);

    const tableBodyData = tableBodyParser(responseData, order);
    const tableBody = renderTableBody(tableBodyData);

    const tableElement = document.getElementById('data-table');
    tableElement.innerHTML = `${ tableHeader }${ tableBody }`;
}

// Table Header
function renderTableHeader(content=[]) {
    const tableHeaderCells = content.map((data, index) => { return renderTableHeaderCell(data, index); }).join('');
    return `
        <thead>
            <tr>${ tableHeaderCells }</tr>
        </thead>
    `;
}

function renderTableHeaderCell(content={ title: 'Header Cell' }, index) {
    const title = content.title;
    return `<th class="sort-control" data-index="${ index }">${ title }</th>`;
}

// Table Body
function renderTableBody(content=[]) {
    const tableBodyContent = content.map((data) => { return renderTableRow(data); }).join('');
    return `
        <tbody>${ tableBodyContent }</tbody>
    `;
}

function renderTableRow(content=[]) {
    const tableCells = content.map((data) => { return renderTableCell(data); }).join('');
    
    return `<tr>${ tableCells }</tr>`;
}

function renderTableCell(content='Table Cell') {
    return `<td>${ content }</td>`;
}
