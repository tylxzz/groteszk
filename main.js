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

generateForm();

const form = document.getElementById('form')
form.addEventListener('submit', function(e){
    e.preventDefault();
    const szarmazas = document.getElementById('szarmazas');
    const szerzo1 = document.getElementById('szerzo1');
    const szerzo1mu = document.getElementById('szerzo1mu');
    const szerzo2 = document.getElementById('szerzo2');
    const szerzo2mu = document.getElementById('szerzo2mu');

    const szarmazasvalue = szarmazas.value;
    const szerzo1value = szerzo1.value;
    const szerzo1muvalue = szerzo1mu.value;
    let szerzo2value = szerzo2.value;
    let szerzo2muvalue = szerzo2mu.value;

    if(szerzo2value === '' && szerzo2muvalue === '') {
        szerzo2value = undefined;
        szerzo2muvalue = undefined;
    }

    if(validateFields(szarmazas, szerzo1, szerzo1mu, szerzo2, szerzo2mu)) {
        const newGroteszk = {
            szarmazas: szarmazasvalue,
            szerzo1: szerzo1value,
            szerzo1mu: szerzo1muvalue,
            szerzo2: szerzo2value,
            szerzo2mu: szerzo2muvalue,
        };
        groteszk.push(newGroteszk);
        form.reset();
        renderTable(groteszk);
    }
})

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

function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    document.body.appendChild(form);

    const formValues = [
        {id: 'szarmazas', label: 'Származás:'},
        {id: 'szerzo1', label: '1. szerző:'},
        {id: 'szerzo1mu', label: '1. szerző műve:'},
        {id: 'szerzo2', label: '2. szerző:'},
        {id: 'szerzo2mu', label: '2. szerző műve:'}
    ];

    for(const field of formValues) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.name = field.id;

        const error = document.createElement('div');
        error.className = 'error';

        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        const br3 = document.createElement('br');

        div.appendChild(label);
        div.appendChild(br1);
        div.appendChild(input);
        div.appendChild(br2);
        div.appendChild(error);
        div.appendChild(br3);
        form.appendChild(div);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Hozzáadás';
    form.appendChild(button);
}

function validateFields(szarmazas, szerzo1, szerzo1mu, szerzo2, szerzo2mu) {
    let valid = true;
    const errorMessages = form.querySelectorAll('.error');
    for(const error of errorMessages) {
        error.innerHTML = "";
    }

    valid = validateElement(szarmazas, 'Kötelező megadni a szerző(k) származását!');
    valid = validateElement(szerzo1, 'Kötelező megadni a szerző nevét!');
    valid = validateElement(szerzo1mu, 'Kötelező megadni a szerző művét!');

    if(szerzo2mu.value != '') {
        valid = validateElement(szerzo2, 'Add meg a második szerő nevét!');
    }

    if(szerzo2.value != '') {
        valid = validateElement(szerzo2mu, 'Add meg a második szerő művének címét!');
    }

    return valid;
}

function validateElement(element, errorMessages) {
    const error = element.parentElement.querySelector('.error');
    if(element.value === '') {
        error.innerHTML = errorMessages;
        return false;
    }
    else {
        error.innerHTML = "";
        return true;
    }
}