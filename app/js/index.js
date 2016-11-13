import _ from 'lodash';
import myAjax from './my-ajax';

myAjax(handleRequest, 'logs/speedtest.json', 'GET');

function handleRequest(http) {
    if (http.status == 200) {
        renderTable(http.response)
    }
    else if (http.status == 400) {
        console.log('aww :(');
    }
    else {
        console.log('wtf?? >:(');
    }
}

function tableHeaderParser(order) {
    return order.map((data) => { return data.title; });
}

function tableBodyParser(response, order) {
    const sortQuery = order[2].query;
    response.sort((a, b) => {
        const aValue = parseFloat(_.get(a, sortQuery));
        const bValue = parseFloat(_.get(b, sortQuery));
        if(aValue > bValue) return 1;
        if(bValue > aValue) return -1;

        return 0;
    });
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

function renderTable(response) {
    const responseData = JSON.parse(response);
    const order = [
        {
            title: 'Time',
            query: ['date', 'iso']
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

    const tableHeaderData = tableHeaderParser(order)
    const tableHeader = renderTableHeader(tableHeaderData);

    const tableBodyData = tableBodyParser(responseData, order);
    const tableBody = renderTableBody(tableBodyData);

    const table = document.getElementById('data-table');
    table.innerHTML = `${ tableHeader }${ tableBody }`;
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
