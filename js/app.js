const addTaskBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('modal');

function createTask() {
    const input = document.getElementById('inputTask'); 
    const inputValue = input.value.trim();

    if (inputValue != '') {
        const li = document.createElement('li');
        li.classList.add('tasks');
        const liContainer = document.getElementById('list');
    
        li.append(inputValue);
        liContainer.appendChild(li);
        input.value = '';
        return true;
    } else {
        const para = document.getElementById('para');
        para.textContent = 'Invalid input'
        return false;
    }
}

function open_modal() {
    const openModal = document.getElementById('openModalBtn');

    openModal.addEventListener('click', function(e) {
        e.defaultPrevented  // delete the # in the url
        modal.classList.add('modal--show');
    });
}

function close_modal() {
    const closeModal = document.getElementById('closeModalBtn');

    closeModal.addEventListener('click', function(e) {
        e.preventDefault; // delete the # in the url
        modal.classList.remove('modal--show');
    })
}

function app() {
    open_modal();
    if (close_modal) {
        close_modal();
    }
    addTaskBtn.addEventListener('click',() => {
        if (createTask())
            modal.classList.remove('modal--show');
    })
}

app();