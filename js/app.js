const addTaskBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('modal');
const liContainer = document.getElementById('list');

function createDeleteBtn() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.append(icon);
    icon.className = 'fa-solid fa-trash';

    return button;
}

function createDoneBtn() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.append(icon);
    icon.className = 'fa-solid fa-check';

    return button;
}


function createTask() {
    const input = document.getElementById('inputTask'); 
    const inputValue = input.value.trim();
    const para = document.getElementById('para');

    if (inputValue != '') {
        let li = document.createElement('li');
        li.classList.add('tasks');
        const deleteBtn = createDeleteBtn();
        const doneBtn = createDoneBtn();
        
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
        doneBtn.addEventListener('click', function() {
            li.style.textDecoration = 'line-through'
        })
    
        li.append(inputValue);
        
        li.append(deleteBtn);

        li.append(doneBtn);
        liContainer.appendChild(li);
        
        para.classList.add('para-added')
        para.textContent = 'Added task'


        
        input.value = '';
        return true;
    } else {
        para.classList.add('para-error')
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