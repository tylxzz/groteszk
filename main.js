let groteszk = [
    {
        szarmazas: 'Orosz',
        szerzo1: 'Gogol',
        szerzo1mu: 'A köpönyeg',
        szerzo2: 'Csehov',
        szerzo2mu: 'A csinovnyik halála'
    },
    {
        szarmazas: 'Cseh',
        szerzo1: 'Franz Kafka',
        szerzo1mu: 'Az átváltozás',
    },
    {
        szarmazas: 'Magyar',
        szerzo1: 'Örkény István',
        szerzo1mu: 'Egyperces Novellák',
        szerzo2: 'József Attila',
        szerzo2mu: 'Klárisok'
    },
    {
        szarmazas: 'Svájc',
        szerzo1: 'Friedrich Dürrenmatt',
        szerzo1mu: 'A fizikusok',
    }
]

const table = createHTMLElement('table', 'gtable', document.body);
createHTMLElementWithParentId('colgroup', 'gcolg', 'gtable');
createHTMLElementWithParentId('col', 'gcol1', 'gcolg');
createHTMLElementWithParentId('col', 'gcol2', 'gcolg');
createHTMLElementWithParentId('col', 'gcol3', 'gcolg');
document.getElementById('gcol1').classList.add('colored-column');
document.getElementById('gcol3').classList.add('colored-column');

createHTMLElementWithParentId('thead', 'gth', 'gtable');
createHTMLElementWithParentId('tr', 'gtr', 'gth');
renderTableHeader();
createHTMLElementWithParentId('tbody', 'gtbody', 'gtable');

renderTable(groteszk);

function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parent != undefined) {
        createHTMLElement(tag, id, parent);
    }
}

function renderTableHeader() {
    const tr = document.getElementById('gtr');
    const thvalues = [
        {innerHTML: 'Nemzetiség'},
        {innerHTML: 'Szerző'},
        {innerHTML: 'Mű'},
    ]

    for(const value of thvalues) {
        createTableCell('th', value.innerHTML, tr);
    }
}

function renderTable(groteszk) {
    const tbody = document.getElementById('gtbody');
    tbody.innerHTML = '';
    for(const gr of groteszk) {
        const row = document.createElement('tr');
        tbody.appendChild(row);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        td1.innerHTML = gr.szarmazas;
        td2.innerHTML = gr.szerzo1;
        td3.innerHTML = gr.szerzo1mu;

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);

        if(gr.szerzo2 && gr.szerzo2mu) {
            td1.rowSpan = 2;
            const row1 = document.createElement('tr');
            tbody.appendChild(row1);
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            td4.innerHTML = gr.szerzo2;
            td5.innerHTML = gr.szerzo2mu;

            row1.appendChild(td4);
            row1.appendChild(td5);
        }
    }
}