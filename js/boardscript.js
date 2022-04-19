let currentDraggedElement;
let testtask = [
    {
        'title': 'Board mit Drag and Drop erstellen',
        'category': 'Sales',
        'description': 'Beschreibung 1',
        'urgency': 'High',
        'date': '14.04.2022',
        'assigned': [1],
        'status': 'todo',
        'location': 'board',
    },
    {
        'title': 'Titel 2',
        'category': 'IT',
        'description': 'Beschreibung 2',
        'urgency': 'Middle',
        'date': '15.04.2022',
        'assigned': [3, 2],
        'status': 'todo',
        'location': 'board',
    },
    {
        'title': 'Titel 3',
        'category': 'Marketing',
        'description': 'Beschreibung 3',
        'urgency': 'Low',
        'date': '16.04.2022',
        'assigned': [2],
        'status': 'todo',
        'location': 'board',
    }];

let boardtasks = [];

async function initBoard() {
    await initUsers();
    await loadTasks();
    includeHTML();
    renderTaskstoBoard();
}

function filtertask(board) {
    return tasks.filter(f => f.location == board)   //nahher wieder in tasks, ändern sucht alle trasks mit location board
}

function renderTaskstoBoard() {
    let progresses = ['todo', 'inprogress', 'testing', 'done'];
    boardtasks = filtertask('board');

    for (let status = 0; status < progresses.length; status++) {
        const progress = progresses[status];
        let boardcolum = document.getElementById(progress);
        boardcolum.innerHTML = '';
        for (let i = 0; i < boardtasks.length; i++) {
            const task = boardtasks[i];
            if (task.status == progress) {
                boardcolum.innerHTML += generateHTML(i, progress);
                colors(i);
                taskassigned(i);
            }
        }
    }
}
function colors(i) {
    let color = boardtasks[i].urgency
    if (color == 'High') {
        document.getElementById('header' + i).style = 'background-color: #de4e4e';
    }
    if (color == 'Middle') {
        document.getElementById('header' + i).style = 'background-color: #ed9e00';
    }
    if (color == 'Low') {
        document.getElementById('header' + i).style = 'background-color: #5376c9';
    }
}

function taskassigned(i) {
    for (let j = 0; j < boardtasks[i].assigned.length; j++) {
        const assigned = boardtasks[i].assigned[j]['id'];
        let user = users.filter(f => f.userId == assigned);
        console.log("user", user);
        document.getElementById('assigned' + i).innerHTML += `<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;

    }
}

function generateHTML(i, progress) {
    return ` <div draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div id='header${i}' style="background-color: black" class="task-header">
        <div class="task-title">
            <h4>${boardtasks[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span onclick="deletetask(${i})">&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>${boardtasks[i].date}</span>
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <div class="task-description">
        <span>${boardtasks[i].description}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>${boardtasks[i].category}</span></div>
        <div class="task-action-btn" onclick="nextsection(${i},'${progress}')">
            <span>&#10149;</span>
        </div>
    </div>
</div>
`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(index) {
    currentDraggedElement = index;
}

function moveto(newstatus) {
    boardtasks[currentDraggedElement].status = newstatus;
    updateBoardTasksToBackend();
    renderTaskstoBoard();
}

function deletetask(position) {
    for (let index = 0; index < tasks.length; index++) {
        if (boardtasks[position]['title'] == tasks[index]['title']) {

            tasks.splice(position, 1)
            updateBoardTasksToBackend();
            renderTaskstoBoard()
        }
    }
}


function nextsection(position, progress) {
    currentDraggedElement = position;
    if (progress == 'todo') {
        boardtasks[currentDraggedElement].status = 'inprogress';
    }
    if (progress == 'inprogress') {
        boardtasks[currentDraggedElement].status = 'testing';
    }
    if (progress == 'testing') {
        boardtasks[currentDraggedElement].status = 'done';
    }
    if (progress == 'done') {
        boardtasks[currentDraggedElement].status = 'todo';
    }
    updateBoardTasksToBackend();
    renderTaskstoBoard();
}