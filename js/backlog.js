let backlog =[];

let addTaskArray = [{
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


/**
 * Renders the backlog list initially.
 */
function renderBacklogItems() {
    loadAllTasks();
    checkEmptyArray();
    console.log(addTaskArray);
    for (let i = 0; i < addTaskArray.length; i++) {
        renderBacklogCardTemplate(i);
    }
}


/**
 * Loads all tasks from the backend in list 'tasks'.
 */
function loadAllTasks(){
    let tasks = backend.getItem('tasks');
    let backlogJSON = JSON.parse(tasks);
    backlog.push(backlogJSON);
    console.log(backlog); 
}


/**
 * Check backlog array whether it is empty. If backlog array is empty,
 *then backlog overview disapears and shows a text.
*/
function checkEmptyArray() {
    let textByEmptyArray = document.getElementById('emptyArray');

    if (addTaskArray.length == 0) {
        console.log('Array is empty!');
        textByEmptyArray.innerHTML = 'There is no backlog available. Please add some tasks!';
        document.getElementById('backlogContent').classList.add('d-none');
    }
}


/**
 * Renders the backlog template list.
 * @param {*} i 
 */
function renderBacklogCardTemplate(i) {
    let task = addTaskArray[i];
    let background = task['urgency'];
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    backlogContentRow.innerHTML += /*html*/`
    <div id="backlogElementField(${i})" class="backlogElementField">
        <div class="backlogElementTitle">${task['title']}</div>
        <div class="backlogElement">${task['assigned']}</div>
        <div class="backlogElement">${task['category']}</div>
        <div class="backlogElementContainer">
                <img class="backlogElementBtn" src="./img/delete.svg">
                <img class="backlogElementBtn" src="./img/send.svg">
            </div>
    </div>
`;
    document.getElementById(`backlogElementField(${i})`).classList.add('border-left-' + background)
    console.log(background);
}


