import myAjax from './my-ajax';

let dood = 'youz';
console.log('dood', dood);

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

function renderTable(response) {
    console.log(JSON.parse(response)); 
    const table = document.getElementById('data-table');
    const tableHeader = renderTableHeader();
    const tableBody = renderTableBody();
    table.innerHTML = `${ tableHeader }${ tableBody }`;
}

function renderTableBody() {
    const tableBodyContent = renderTableRow();
    return `
        <tbody>${ tableBodyContent }</tbody>
    `;
}

function renderTableHeader() {
    const tableHeaderCells = renderTableHeaderCell();
    return `
        <thead>
            <tr>${ tableHeaderCells }</tr>
        </thead>
    `;
}

function renderTableHeaderCell(content='Header Cell') {
    return `<th>${content}</th>`;
}

function renderTableRow() {
    const tableCells = renderTableCell();
    return `<tr>${ tableCells }</tr>`;
}

function renderTableCell(content='Table Cell') {
    return `<td>${ content }</td>`;
}
