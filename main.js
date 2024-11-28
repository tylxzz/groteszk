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