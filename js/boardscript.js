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
    },
    {
        'title': 'Titel 2',
        'category': 'IT',
        'description': 'Beschreibung 2',
        'urgency': 'Middle',
        'date': '15.04.2022',
        'assigned': [3,2],
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

    async function initBoard() {
        await initUsers();
        await loadTasks();
        includeHTML();
        renderTaskstoBoard();
    }

function filtertask(board){   
return testtask.filter(f => f.location == board)   //nahher wieder in sortTasks, ändern sucht alle trasks mit location board
}

function renderTaskstoBoard(){
    let progresses= ['todo','inprogress','testing','done'];
    let boardttasks = filtertask('board');

    for (let status=0; status<progresses.length; status++){
        const progress = progresses[status];
        let boardcolum= document.getElementById(progress);
        boardcolum.innerHTML='';
        for (let i=0; i<testtask.length; i++){
            const task = testtask[i];
            if (task.status==progress){
                boardcolum.innerHTML+=generateHTML(i);
                colors(i);
                taskassigned(i);
        }
    }
    }
}
function colors(i){
    let color =testtask[i].urgency
    if (color== 'High'){
        document.getElementById('header'+i).style='background-color: #d72700'
    }
    if (color== 'Middle'){
        document.getElementById('header'+i).style='background-color: #ed9e00'
    }
    if (color== 'Low'){
        document.getElementById('header'+i).style='background-color: #4caf50'
    }
}

function taskassigned(i){
    for (let j=0; j<testtask[i].assigned.length; j++){
        const assigned= testtask[i].assigned[j];
        let user= users.filter(f => f.userId == assigned);
        console.log(user);
        document.getElementById('assigned'+i).innerHTML+=`<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;

    }
}

function generateHTML(i){
    return` <div draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div id='header${i}' style="background-color: black" class="task-header">
        <div class="task-title">
            <h4>${testtask[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span onclick="deletetask(${i})">&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>${testtask[i].date}</span>
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <div class="task-description">
        <span>${testtask[i].description}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>${testtask[i].category}</span></div>
        <div class="task-action-btn">
            <span>&#10149;</span>
        </div>
    </div>
</div>
`;
}

function allowDrop(ev){
    ev.preventDefault();
}

function startDragging(index){
    currentDraggedElement=index;
}

function moveto(newstatus){
    testtask[currentDraggedElement].status=newstatus;
    renderTaskstoBoard();
}

function deletetask(position){
    testtask.splice(position,1)
    renderTaskstoBoard()
}