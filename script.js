var todoWrapper = document.querySelector('.todo__wrapper');
var taskBody = document.querySelector('.todo__body');
var addText = document.querySelector('.todo__inputtext');
var addBtn = document.querySelector('.todo__addbutton');

function init() {
    var fromStorage = localStorage.getItem('todoList');
    taskBody.innerHTML = fromStorage;
    listCheck();
};

function createTask(text) {
    return `<div class="todo__task" data-state="active">
                <p class="todo__text">${text}</p>
                <div>
                    <input type="button" class="button btn__complete">
                    <input type="button" class="button btn__delete">
                </div>
            </div>`;
};

function listCheck() {
    if (taskBody.childNodes.length == 0) {
        var paragpaph = document.createElement('p');
        paragpaph.textContent = 'List is empty';
        paragpaph.classList.add('grey-text');
        taskBody.appendChild(paragpaph);
    } else if (taskBody.childNodes.length >= 1) {
            var greyText = document.querySelector('.grey-text');
            taskBody.removeChild(greyText);
            taskBody.style.padding = '20px 15px'; 
    }
};

function optionSelect() {
    var options = document.querySelector('.todo__options').value;
    var tasks = document.querySelectorAll('.todo__task');
    tasks.forEach(element => {
        if (options == 'all') {
            element.style.display = 'inherit';
        } else if(options != element.dataset.state) {
            element.style.display = 'none';
        } else {
            element.style.display = 'inherit';
        }
    });
};

function save() {
    localStorage.setItem('todoList', document.querySelector('.todo__body').innerHTML);
};

function action(e) {
    if(e.target.classList.contains('todo__addbutton')) {
        if (addText.value == '') {
            addText.style.backgroundColor = '#fcc';
        } else {
        addText.style.backgroundColor = '#fff';
        taskBody.insertAdjacentHTML('beforeEnd', createTask(addText.value));
        addText.value = '';
        listCheck();
        };
    };
    if(e.target.classList.contains('btn__complete')) {
        e.target.closest('.todo__task').dataset.state = 'completed';
    };
    if(e.target.classList.contains('btn__delete')) {
        e.target.closest('.todo__task').dataset.state = 'deleted';
    };
    if(e.target.classList.contains('todo__text')) {
        e.target.closest('.todo__task').dataset.state = 'active';
    };
    if(e.target.classList.contains('todo__options')) {
        optionSelect();
    };
    if(e.target.classList.contains('todo__clear')) {
        taskBody.innerHTML = '';
        listCheck();
    }
    save();
};

todoWrapper.addEventListener('click', action, false);
todoWrapper.addEventListener('touchend', action, false);

init();