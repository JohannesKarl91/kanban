function generateHTML(task){
    return` <div draggable="true" ondragstart="startDragging()" class="task-card">
    <div class="task-header">
        <div class="task-title">
            <h4>§{task['title']}</h4>
        </div>
        <div class="task-delete-btn"><span>&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>§{task['date']}</span>
        </div>
        <div class="task-assigned">
            <img class="member-img" src="./img/users/test.jpg">
            <img class="member-img" src="./img/users/alex.jpg">
        </div>
    </div>
    <div class="task-description">
        <span>§{task['description']}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>§{task['category']}</span></div>
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