/**
 * 
 * @param {'td' | 'th'} tagName 
 * @param {string} innerHTML 
 * @param {HTMLTableRowElement} parent 
 * @returns {HTMLTableCellElement}
 */
function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

/**
 * 
 * @param {string} tag 
 * @param {string} id 
 * @param {HTMLElement} parent 
 * @returns {HTMLElement}
 */
function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

/**
 * 
 * @param {string} tag 
 * @param {string} id 
 * @param {string} parentid 
 * @returns {HTMLElement | undefined}
 */
function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parent != undefined) {
        createHTMLElement(tag, id, parent);
    }
}

/**
 * @returns {HTMLTableCellElement}
 */
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

/**
 * 
 * @param {Array} groteszk 
 */
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
 /**
  * @returns {HTMLElement}
  */
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

/**
 * 
 * @param {*} szarmazas 
 * @param {*} szerzo1 
 * @param {*} szerzo1mu 
 * @param {*} szerzo2 
 * @param {*} szerzo2mu 
 * @returns {bool}
 */
function validateFields(szarmazas, szerzo1, szerzo1mu, szerzo2, szerzo2mu) {
    let valid = true;
    const errorMessages = form.querySelectorAll('.error');
    for(const error of errorMessages) {
        error.innerHTML = "";
    }

    valid = validateElement(szarmazas, 'Kötelező megadni a szerző(k) származását!') && valid;
    valid = validateElement(szerzo1, 'Kötelező megadni a szerző nevét!') && valid;
    valid = validateElement(szerzo1mu, 'Kötelező megadni a szerző művét!') && valid;

    if(szerzo2mu.value != '') {
        valid = validateElement(szerzo2, 'Add meg a második szerő nevét!') && valid;
    }

    if(szerzo2.value != '') {
        valid = validateElement(szerzo2mu, 'Add meg a második szerő művének címét!') && valid;
    }

    return valid;
}

/**
 * 
 * @param {*} element 
 * @param {*} errorMessages 
 * @returns {bool}
 */
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