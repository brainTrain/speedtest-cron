import _ from 'lodash';
import myAjax from './my-ajax';

myAjax(handleRequest, 'logs/speedtest.json', 'GET');

function handleRequest(http) {
    if (http.status == 200) {
        const order = [
            {
                title: 'Time',
                query: ['date', 'iso'],
                sortQuery: ['date', 'epoch']
            },
            {
                title: 'Ping',
                query: ['data', 'ping']
            },
            {
                title: 'Download',
                query: ['data', 'download']
            },
            {
                title: 'Upload',
                query: ['data', 'upload']
            }
        ];
        const sortConfig = {
            type: 'ascending',
            index: 2
        };
        renderSortConfig(order, sortConfig);
        renderTable(http.response, order, sortConfig);
    }
    else if (http.status == 400) {
        console.log('aww :(');
    }
    else {
        console.log('wtf?? >:(');
    }
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

function tableHeaderParser(order) {
    return order.map((data) => { return data.title; });
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

    const tableHeaderData = tableHeaderParser(order)
    const tableHeader = renderTableHeader(tableHeaderData);

    const tableBodyData = tableBodyParser(responseData, order);
    const tableBody = renderTableBody(tableBodyData);

    const tableElement = document.getElementById('data-table');
    tableElement.innerHTML = `${ tableHeader }${ tableBody }`;
}

// Table Header
function renderTableHeader(content=[]) {
    const tableHeaderCells = content.map((data) => { return renderTableHeaderCell(data); }).join('');
    return `
        <thead>
            <tr>${ tableHeaderCells }</tr>
        </thead>
    `;
}

function renderTableHeaderCell(content='Header Cell') {
    return `<th>${ content }</th>`;
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
