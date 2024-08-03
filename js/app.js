const addTaskBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('modal');
const liContainer = document.getElementById('list');

const modalEdit = document.getElementById('modalEdit');
const taskEditInput = document.getElementById('editInput');
const saveTaskBtn = document.getElementById('saveTaskBtn');

const darkModeBtn = document.getElementById('toggleDarkMode');
const lightModeBtn = document.getElementById('toggleLightMode');

// Load tasks from local storage when the page loads
loadTasks();

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

function createEditBtn() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.append(icon);
    icon.className = 'fa-solid fa-pen-to-square';
    return button;
}

function openModal() {
    const openModalBtn = document.getElementById('openModalBtn');
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('modal--show');
    });
}

function closeModal() {
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    closeModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('modal--show');
    });
}

// function saveTask() {
//     const val = taskEditInput.value.trim();

// }

// Refactored createTask function to handle both new and loaded tasks
function createTask(taskDescription) {
    const inputValue = taskDescription ? taskDescription.trim() : document.getElementById('taskInput').value.trim();
    const para = document.getElementById('para');
    const doneAudio = new Audio();
    const removeAudio = new Audio();
    doneAudio.src = './audios/done.wav';
    removeAudio.src = './audios/remove.wav';

    if (inputValue !== '') {
        let li = document.createElement('li');
        li.classList.add('tasks');

        const deleteBtn = createDeleteBtn();
        const doneBtn = createDoneBtn();
        const editBtn = createEditBtn();
        
        deleteBtn.addEventListener('click', function() {
            removeAudio.play();
            li.remove();
            saveTasks();
        });

        doneBtn.addEventListener('click', function() {
            doneAudio.play();
            li.remove();
            saveTasks();
        });

        editBtn.addEventListener('click', function() {
            modalEdit.classList.add('modal--show');
            para.remove();
            taskEditInput.value = li.textContent.trim(); // Set the current task description in the input field
            saveTaskBtn.onclick = function() {
                const newValue = taskEditInput.value.trim();
                if (newValue !== '') {
                    li.firstChild.textContent = newValue; // Update the task text
                    modalEdit.classList.remove('modal--show');
                    saveTasks();
                }
            }
            document.getElementById('closeModalEditBtn').onclick = function() {
                modalEdit.classList.remove('modal--show');
            };
        });

        li.textContent = inputValue;
        
        li.append(deleteBtn);
        li.append(doneBtn);
        li.append(editBtn);

        liContainer.appendChild(li);
        
        if (!taskDescription) {  // Only show "Added task" message for new tasks
            para.classList.add('para-added');
            para.textContent = 'Added task';
            document.getElementById('taskInput').value = '';
        }

        document.getElementById('taskInput').value = '';
        saveTasks();
        return true;
    } else {
        para.classList.add('para-error');
        para.textContent = 'Invalid input';
        return false;
    }
}

function saveTasks() {
    let tasks = [];
    liContainer.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTask(task));
}

function toggleDarkMode() {
    lightModeBtn.classList.add('toggle--hide');

    // dark mode
    darkModeBtn.addEventListener('click', function() {
        lightModeBtn.classList.add('toggle--show');
        darkModeBtn.classList.add('toggle--hide');
        document.body.classList.add('body-dark');
        document.querySelectorAll('.modal-container').forEach(modals => {
            modals.classList.add('modal-dark');
        });
        document.querySelectorAll('.form-container').forEach(modals => {
            modals.classList.add('modal-dark');
        });
        document.querySelectorAll('.secondary-text-dark').forEach(text => {
            text.classList.add('secondary-text-dark1');
        })
        document.querySelectorAll('li').forEach(taskText => {
            taskText.classList.add('secondary-text-dark1');
        })
        saveTasks();
        return;
    })

    // light mode 
    lightModeBtn.addEventListener('click', function() {
        lightModeBtn.classList.remove('toggle--show');
        darkModeBtn.classList.remove('toggle--hide');
        document.body.classList.remove('body-dark');
        document.querySelectorAll('.modal-container').forEach(modals => {
            modals.classList.remove('modal-dark');
        });
        document.querySelectorAll('.form-container').forEach(modals => {
            modals.classList.remove('modal-dark');
        });
        document.querySelectorAll('.secondary-text-dark').forEach(text => {
            text.classList.remove('secondary-text-dark1');
        })
        document.querySelectorAll('li').forEach(taskText => {
            taskText.classList.remove('secondary-text-dark1');
        })
        saveTasks();
        return;
    })
    saveTasks()
}

toggleDarkMode();

function app() {
    openModal();
    if (closeModal) {
        closeModal();
    }
    addTaskBtn.addEventListener('click',() => {
        if (createTask())
            modal.classList.remove('modal--show');
    })
}

app();