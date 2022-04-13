let backlogTask = [{
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
},
];

/**
 * Check test array via console-log() function
 */
function consoleCheck() {
    console.log(backlogTask)
}


function renderBacklogItems() {
    let backlogContent = document.getElementById('backlogContentTaskAsElement')

    if (backlogTask.length == 0) {
        backlogContent.innerHTML = 'Add task'
    }
}