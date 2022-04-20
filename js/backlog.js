let backlogCounter = 0;
let tasks = [];
let addTaskArray = [
    {
        'title': 'Board mit Drag and Drop erstellen',
        'category': 'Sales',
        'description': 'Beschreibung 1',
        'urgency': 'High',
        'date': '14.04.2022',
        'assigned': 'Alex Bachmann'
    },
    {
        'title': 'Titel 2',
        'category': 'IT',
        'description': 'Beschreibung 2',
        'urgency': 'Middle',
        'date': '15.04.2022',
        'assigned': 'Rebecca Häckl'
    },
    {
        'title': 'Titel 3',
        'category': 'Marketing',
        'description': 'Beschreibung 3',
        'urgency': 'Low',
        'date': '16.04.2022',
        'assigned': 'Johannes Weber'
    }];


async function initBacklog() {
    await initUsers();
    await loadTasks();
    includeHTML();
    navHighlightDesktop('navbarAnchor1', 'navbarLine1');
    navHighlightMobile('navbarAnchor5', 'navbarLine5');
    renderBacklogItems();
}


/**
 * Loads all tasks from the backend in list 'tasks'.
 */
async function loadTasks() {
    tasks = await JSON.parse(backend.getItem('tasks')) || [];
    console.log('tasks', tasks);
}


/**
 * Renders the backlog list initially.
 */
function renderBacklogItems() {
    checkEmptyArray();
    cleanBacklogContentRow();
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]['location']);
        if (tasks[i]['location'] == 'backlog') {
            renderBacklogCardTemplate(i);
            backlogCounter = backlogCounter + 1;
        }
    }
    checkEmptyArray(backlogCounter);
    backlogCounter = 0;
}


/**
 * Renders the backlog template list.
 * @param {*} i 
 */
function renderBacklogCardTemplate(i) {
    let backlogItem = tasks[i];
    let background = backlogItem['urgency'];
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    backlogContentRow.innerHTML += /*html*/`
    <div id="backlogElementField(${i})" class="backlogElementField">
        <div id="assigned${i}" class="backlogElement"></div>
        <div class="backlogElement">${backlogItem['category']}</div>
        <div class="backlogElementTitleDescription">
            <div class="titleElement">${backlogItem['title']}</div>
            <div class="descriptionElement">${backlogItem['description']}</div>
        </div>
        <div class="backlogElementContainer">
            <a onclick="deleteBacklogItem(${i})" title="delete"><img class="backlogElementBtn" src="./img/delete.svg">
        </a>
            <a onclick="deleteBacklogItem(${i})" title="send to board"><img class="backlogElementBtn" src="./img/send.svg">
        </div>
    </div>
`;
    renderAssignedImg(i);
    document.getElementById(`backlogElementField(${i})`).classList.add('border-left-' + background);
}


function renderAssignedImg(j) {
    for (let i = 0; i < tasks[j]['assigned'].length; i++) {
        const id = tasks[j]['assigned'][i]['id'];
        if (id !== 4) {
            checkImgAlex(j, id);
            checkImgJohannes(j, id);
            checkImgRebecca(j, id)
        }

        else {
            assignedImg = document.getElementById(`assigned${j}`);
            assignedImg.innerHTML += /*html */`
            <img class="backlogImg" src="./img/users/test.jpg">
            `;
        }
    }
}


function checkImgAlex(j, id) {
    if (id == 1) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
        <img class="backlogImg" src="./img/users/alex.jpg">
        `;
    }
}


function checkImgJohannes(j, id) {
    if (id == 2) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
        <img class="backlogImg" src="./img/users/johannes.jpg">
        `;
    }
}


function checkImgRebecca(j, id) {
    if (id == 3) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
    <img class="backlogImg" src="./img/users/rebecca.jpg">
    `;
    }
}


/**
 * Check backlog array whether it is empty. If backlog array is empty,
 *then backlog overview disapears and shows a text.
*/
function checkEmptyArray(backlogConter) {
    let textByEmptyArray = document.getElementById('emptyArray');

    if (backlogConter == 0) {
        console.log('Array is empty!');
        textByEmptyArray.innerHTML = 'There is no backlog available. Please add some tasks!';
        document.getElementById('backlogContent').classList.add('d-none');
    }
}


/**
 * Delete backlog item in beacklog array via the trash button.
 */
function deleteBacklogItem(i) {
    tasks.splice(i, 1);
    updateBoardTasksToBackend();
    renderBacklogItems();

}

/**
 * Add backlog item into board array via the send button.
 * @param {*} index 
 */
function addBacklogItem(index) {
    let array = tasks[index];
    array['location'] = 'board';
    console.log('Array location is', array['location']);
    updateBoardTasksToBackend();
    renderBacklogItems();
}


/**
 * 
 * @returns Empty value for Id: 'backlogContentTaskAsElement'.
 */
function cleanBacklogContentRow() {
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    return backlogContentRow.innerHTML = '';
}


async function updateBoardTasksToBackend() {
    let boardArrayAsJSON = tasks;
    console.log('Loaded array from backlog', boardArrayAsJSON);
    await backend.setItem('tasks', JSON.stringify(boardArrayAsJSON));
}
