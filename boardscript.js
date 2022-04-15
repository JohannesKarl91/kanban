let currentDraggedElement;

function renderTaskstoBoard(){
    let progresses= ['todo','inprogress','testing','done']

    for (let status=0; status<progresses.length; status++){
        const progress = progresses[status];
        let boardcolum= document.getElementById(progress).innerHTML='';
        for (let i=0; i<allTasks.length; i++){
            const task = allTasks[i];
            if (task.status==progress){
                boardcolum.innerHTML+=generateHTML(i);
            
        }
    }
    }
}


function generateHTML(i){
    return` <div draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div class="task-header">
        <div class="task-title">
            <h4>§{allTasks[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span>&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>§{allTasks[i].date}</span>
        </div>
        <div class="task-assigned">
            <img class="member-img" src="./img/users/test.jpg">
            <img class="member-img" src="./img/users/alex.jpg">
        </div>
    </div>
    <div class="task-description">
        <span>§{allTasks[i].description}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>§{allTasks[i].category}</span></div>
        <div class="task-action-btn">
            <span>&#10149;</span>
        </div>
    </div>
</div>
`
}

function allowDrop(ev){
    ev.preventDefault();
}

function startDragging(index){
    currentDraggedElement=index;
}