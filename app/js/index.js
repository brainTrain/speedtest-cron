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

function tableHeaderParser(response) {
    // only take first data object to get keys for header
    const data = response[0].data;
    return ['time', ...Object.keys(data)];
}

function tableBodyParser(response, order) {
    return response.map((row) => {
        return [row.date.iso, row.data.ping, row.data.download, row.data.upload];
    });
}

function renderTable(response) {
    const responseData = JSON.parse(response);
    console.log(responseData); 

    const tableHeaderData = tableHeaderParser(responseData)
    const tableHeader = renderTableHeader(tableHeaderData);

    const tableBodyData = tableBodyParser(responseData);
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