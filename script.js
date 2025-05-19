const inventoryTableBody = document.getElementById('inventory-table-body');
const apiUrl = 'https://script.google.com/a/macros/oceanica.ufrj.br/s/AKfycbx8rWQNoKvWa9FKFsZd1KUS5FQdrN9vRbKfW5ZMg_I/dev'; // Substitua pela URL do seu aplicativo da web do Apps Script

function fetchInventory() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayInventory(data);
        })
        .catch(error => {
            console.error('Erro ao buscar o inventário:', error);
            inventoryTableBody.innerHTML = '<tr><td colspan="5">Erro ao carregar o inventário.</td></tr>';
        });
}

function displayInventory(inventory) {
    inventoryTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    inventory.forEach(item => {
        const row = inventoryTableBody.insertRow();

        const idCell = row.insertCell();
        idCell.textContent = item.id;

        const nomeCell = row.insertCell();
        nomeCell.textContent = item.nome;

        const configuracaoCell = row.insertCell();
        configuracaoCell.textContent = item.configuracao;

        const localizacaoCell = row.insertCell();
        localizacaoCell.textContent = item.localizacao;

        const actionsCell = row.insertCell();
        actionsCell.classList.add('actions-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => openEditModal(item));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.addEventListener('click', () => deleteItem(item.id));
        actionsCell.appendChild(deleteButton);
    });
}

// Chama a função para buscar o inventário quando a página carregar
document.addEventListener('DOMContentLoaded', fetchInventory);

// Funções para adicionar, editar e remover (serão implementadas nos próximos passos)
function addItem(event) {
    event.preventDefault();
    console.log('Adicionar item');
}

function openEditModal(item) {
    console.log('Abrir modal de edição para:', item);
}

function saveEditedItem(event) {
    event.preventDefault();
    console.log('Salvar item editado');
}

function deleteItem(id) {
    console.log('Remover item com ID:', id);
}

// Adiciona um listener para o formulário de adição (por enquanto, apenas loga)
const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', addItem);

// Adiciona listeners para o modal de edição (por enquanto, apenas logam)
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close-button');
const editForm = document.getElementById('edit-form');

if (closeButton) {
    closeButton.addEventListener('click', () => editModal.style.display = 'none');
}

if (editModal) {
    window.addEventListener('click', (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    });
}

if (editForm) {
    editForm.addEventListener('submit', saveEditedItem);
}
