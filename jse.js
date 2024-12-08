// DOM елементи
const pairInput = document.getElementById('pairInput');
const addButton = document.getElementById('addButton');
const sortByNameButton = document.getElementById('sortByName');
const sortByValueButton = document.getElementById('sortByValue');
const deleteButton = document.getElementById('deleteButton');
const pairList = document.getElementById('pairList');

// Функція для перевірки коректності формату "Name=Value"
function validatePairFormat(pair) {
    const parts = pair.split('=');
    if (parts.length !== 2) return false;
    const name = parts[0].trim();
    const value = parts[1].trim();
    return name && value;
}

// Додавання нової пари до списку
function addPair() {
    const input = pairInput.value.trim();

    if (!validatePairFormat(input)) {
        alert('Invalid format. Use "Name=Value" format with alphanumeric characters only.');
        return;
    }

    const [name, value] = input.split('=').map(part => part.trim());

    const div = document.createElement('div');
    div.textContent = `${name}=${value}`;
    div.dataset.name = name;
    div.dataset.value = value;
    div.className = 'list-item';

    pairList.appendChild(div);
    pairInput.value = '';
}

// Сортування по імені
function sortByName() {
    const items = Array.from(pairList.children);
    items.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
    items.forEach(item => pairList.appendChild(item));
}

// Сортування по значенню
function sortByValue() {
    const items = Array.from(pairList.children);
    items.sort((a, b) => a.dataset.value.localeCompare(b.dataset.value));
    items.forEach(item => pairList.appendChild(item));
}

// Видалення виділених елементів
function deleteSelected() {
    const selectedItems = Array.from(pairList.querySelectorAll('.selected'));
    selectedItems.forEach(item => pairList.removeChild(item));
}

// Додавання обробників подій
pairList.addEventListener('click', function(e) {
    if (e.target.classList.contains('list-item')) {
        e.target.classList.toggle('selected');
    }
});

addButton.addEventListener('click', addPair);
sortByNameButton.addEventListener('click', sortByName);
sortByValueButton.addEventListener('click', sortByValue);
deleteButton.addEventListener('click', deleteSelected);