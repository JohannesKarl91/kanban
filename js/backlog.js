let addTaskArray = [{
    'title': 'Titel 1',
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


function renderBacklogItems() {

    checkEmptyArray();

    let backlogContent = document.getElementById('backlogContentTaskAsElement');
    for (let i = 0; i < addTaskArray.length; i++) {
        renderBacklogCardTemplate(i);
    }
}


/**
 * Check test array via console-log() function
 */
function checkEmptyArray() {
    let textByEmptyArray = document.getElementById('emptyArray');

    if (addTaskArray.length == 0) {
        console.log('Array is empty!');
        textByEmptyArray.innerHTML = 'There is no backlog available. Please add some tasks!';
        document.getElementById('backlogContent').classList.add('d-none');
    }
}

function renderBacklogCardTemplate(i) {
    let task = addTaskArray[i];
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    backlogContentRow.innerHTML += /*html*/`
    <div class="backlogElementField">
        <div class="backlogElement">${task['assigned']}</div>
        <div class="backlogElement">${task['urgency']}</div>
        <div class="backlogElement">${task['category']}</div>
        <div class="backlogElement">${task['description']}</div>
    </div>
`;
}