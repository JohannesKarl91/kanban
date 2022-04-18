let backlog = [{
    'title': 'Board mit Drag and Drop erstellen',
    'category': 'Sales',
    'description': 'Hierbei muss das Video von Junus nochmal angesehen und sodann die Funktionalitäten in den Code überführt werden.',
    'urgency': 'High',
    'date': '14.04.2022',
    'assigned': 'Alex Bachmann'
},
{
    'title': 'Backlog erstellen',
    'category': 'IT',
    'description': 'Beschreibung 2',
    'urgency': 'Middle',
    'date': '15.04.2022',
    'assigned': 'Rebecca Häckl'
},
{
    'title': 'Board rendern',
    'category': 'Marketing',
    'description': 'Beschreibung 3',
    'urgency': 'Low',
    'date': '16.04.2022',
    'assigned': 'Johannes Weber'
}];

let board = [];
let sortTasks = [];
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
 * Renders the backlog list initially.
 */
function renderBacklogItems() {
    checkEmptyArray();
    cleanBacklogContentRow();
    for (let i = 0; i < sortTasks[0].length; i++) {
        renderBacklogCardTemplate(i);
    }
}


/**
 * Renders the backlog template list.
 * @param {*} i 
 */
 function renderBacklogCardTemplate(i) {
    let backlogItem = sortTasks[0][i];
    let background = backlogItem['urgency'];
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    backlogContentRow.innerHTML += /*html*/`
    <div id="backlogElementField(${i})" class="backlogElementField">
        <div class="backlogElement">${backlogItem['assigned']}</div>
        <div class="backlogElement">${backlogItem['category']}</div>
        <div class="backlogElementTitleDescription">
            <div class="titleElement">${backlogItem['title']}</div>
            <div class="descriptionElement">${backlogItem['description']}</div>
        </div>
        <div class="backlogElementContainer">
                <img onclick="deleteBacklogItem(${i})" class="backlogElementBtn" src="./img/delete.svg">
                <img onclick="addBacklogItem(${i})" class="backlogElementBtn" src="./img/send.svg">
            </div>
    </div>
`;
    document.getElementById(`backlogElementField(${i})`).classList.add('border-left-' + background);
}


/**
 * Loads all tasks from the backend in list 'tasks'.
 */
async function loadTasks() {
    let tasks = await backend.getItem('tasks');
    sortTasks.push(JSON.parse(tasks));
    console.log('sortTask', sortTasks);

}


/**
 * Check backlog array whether it is empty. If backlog array is empty,
 *then backlog overview disapears and shows a text.
*/
function checkEmptyArray() {
    let textByEmptyArray = document.getElementById('emptyArray');

    if (backlog.length == 0) {
        console.log('Array is empty!');
        textByEmptyArray.innerHTML = 'There is no backlog available. Please add some tasks!';
        document.getElementById('backlogContent').classList.add('d-none');
    }
}


/**
 * Delete backlog item in beacklog array via the trash button.
 */
function deleteBacklogItem(i) {
    backlog.splice(i, 1);
    renderBacklogItems();

}

/**
 * Add backlog item into board array via the send button.
 * @param {*} index 
 */
function addBacklogItem(index) {
    let array = backlog[index];
    board.push(array);
    console.log('Board Array includes', board);
    deleteBacklogItem(index);
}


/**
 * 
 * @returns Empty value for Id: 'backlogContentTaskAsElement'.
 */
function cleanBacklogContentRow() {
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    return backlogContentRow.innerHTML = '';
}


// function updateBoardArrayToBackend(){
//     let boardArrayAsJSON = JSON.stringify(board);
//     backend.setItem('board', boardArrayAsJSON);
// }
