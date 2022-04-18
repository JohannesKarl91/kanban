let assigned = [];
let today = new Date();
let todayfix = today.toISOString().slice(0, 10);

async function initTasks() {
    await initUsers();
    includeHTML();
    navHighlightDesktop('navbarAnchor2', 'navbarLine2');
    navHighlightMobile('navbarAnchor6', 'navbarLine6');
}


function CreateTask(event) {
    event.preventDefault();
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let urgency = document.getElementById('urgency')


    let task = {
        'title': title.value,
        'category': category.value,
        'description': description.value,
        'urgency': urgency.value,
        'date': date.value,
        'assigned': assigned,
        'location': 'backlog',
        'status': 'todo',
    };

    addTask(task);

}

function addTask(task) {

    allTasks.push(task);
    backend.setItem('tasks', JSON.stringify(allTasks));
    clearFormular();
}


function DropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function imageInfos(id, picture) {
    if (assigned.some(any => any.id === id)) {
    }
    else {

        let infos = {
            'id': id
        };
        assigned.push(infos);
        document.getElementById('images').innerHTML += `<div><img id="picture" class="assigned_img" src="${picture}"></img>`;
    }
}


function clearFormular() {
    document.getElementById('images').innerHTML = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    assigned = [];
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('urgency').value = '';
    document.getElementById('myDropdown').innerHTML = '';

}

function duedate() {
    let Date = document.getElementById('date');;
    Date.min = todayfix;
}