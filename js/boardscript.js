let currentDraggedElement;
let testtask = [
    {
        'title': 'Board mit Drag and Drop erstellen',
        'category': 'Sales',
        'description': 'Beschreibung 1',
        'urgency': 'High',
        'date': '14.04.2022',
        'assigned': 'Alex Bachmann',
        'status': 'todo',
    },
    {
        'title': 'Titel 2',
        'category': 'IT',
        'description': 'Beschreibung 2',
        'urgency': 'Middle',
        'date': '15.04.2022',
        'assigned': 'Rebecca Häckl',
        'status': 'todo',
    },
    {
        'title': 'Titel 3',
        'category': 'Marketing',
        'description': 'Beschreibung 3',
        'urgency': 'Low',
        'date': '16.04.2022',
        'assigned': 'Johannes Weber',
        'status': 'todo',
    }];

function renderTaskstoBoard(){
    let progresses= ['todo','inprogress','testing','done']

    for (let status=0; status<progresses.length; status++){
        const progress = progresses[status];
        let boardcolum= document.getElementById(progress);
        boardcolum.innerHTML='';
        for (let i=0; i<testtask.length; i++){
            const task = testtask[i];
            if (task.status==progress){
                boardcolum.innerHTML+=generateHTML(i);
                colors(i);
            
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

function generateHTML(i){
    return` <div draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div id='header${i}' style="background-color: black" class="task-header">
        <div class="task-title">
            <h4>${testtask[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span>&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>${testtask[i].date}</span>
        </div>
        <div class="task-assigned">
            <img class="member-img" src="./img/users/test.jpg">
            <img class="member-img" src="./img/users/alex.jpg">
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