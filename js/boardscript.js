let currentDraggedElement;
let boardtasks = [];


async function initBoard() {
    await initUsers();
    await loadTasks();
    includeHTML();
    renderTaskstoBoard();
}

// function filtertask(board) {
//     return tasks.filter(f => f.location == board)   //nahher wieder in tasks, ändern sucht alle trasks mit location board
// }

function renderTaskstoBoard() {
    let progresses = ['todo', 'inprogress', 'testing', 'done'];
    document.getElementById('todo').innerHTML='';
    document.getElementById('inprogress').innerHTML='';
    document.getElementById('testing').innerHTML='';
    document.getElementById('done').innerHTML='';
    // boardtasks = filtertask('board');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].location == "board")
            for (let status = 0; status < progresses.length; status++) {
                const progress = progresses[status];
                let boardcolum = document.getElementById(progress);
                    const task = allTasks[i];
                    if (task.status == progress) {
                        boardcolum.innerHTML += generateHTML(i, progress);
                        colors(i);
                        taskassigned(i);
                    }
                }
            }
    }

    function colors(i) {
        let color = allTasks[i].urgency
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
        for (let j = 0; j < allTasks[i].assigned.length; j++) {
            const assigned = allTasks[i].assigned[j]['id'];
            let user = users.filter(f => f.userId == assigned);
            console.log("user", user);
            document.getElementById('assigned' + i).innerHTML += `<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;

        }
    }

    function generateHTML(i, progress) {
        return ` <div id="taskat${i}" draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div id='header${i}' style="background-color: black" class="task-header">
        <div class="task-title">
            <h4>${allTasks[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span onclick="deletetask(${i})">&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>${allTasks[i].date}</span>
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <div class="task-description">
        <span>${allTasks[i].description}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>${allTasks[i].category}</span></div>
        <div class="boardBtnSection">
            <img onclick="openedit(${i})" style="width: 20px; height: 20px;" class="member-img" src="./img/edit.svg">
            <div class="task-action-btn" onclick="nextsection(${i},'${progress}')">
                <span>&#10149;</span>
            </div>
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
        allTasks[currentDraggedElement].status = newstatus;
        updateBoardTasksToBackend();
        renderTaskstoBoard();
    }

    function deletetask(position) {
        allTasks.splice(position,1)
                updateBoardTasksToBackend();
                renderTaskstoBoard()
            
        
    }


    function nextsection(position, progress) {
        currentDraggedElement = position;
        if (progress == 'todo') {
            allTasks[currentDraggedElement].status = 'inprogress';
        }
        if (progress == 'inprogress') {
            allTasks[currentDraggedElement].status = 'testing';
        }
        if (progress == 'testing') {
            allTasks[currentDraggedElement].status = 'done';
        }
        if (progress == 'done') {
            allTasks[currentDraggedElement].status = 'todo';
        }
        updateBoardTasksToBackend();
        renderTaskstoBoard();
    }

    function openedit(i) {
        let content = document.getElementById(`taskat${i}`);
        content.innerHTML = editor(i);
        renderCategory(i);
        assignedto(i)
    }

    function editor(i) {
        return `<div id="taskat${i}" draggable="true" ondragstart="startDragging(${i})" class="task-card-edit">
    <div class="column" id='header${i}' style="background-color:" class="task-header">
        <div class="task-title">
            <input id="title_edit${i}" type="text" style="border-radius: 5px;" placeholder="Bitte Titel eingeben" value='${allTasks[i].title}'} 
        </div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <input onclick="duedate2(${i})" style="border-radius: 5px;" value=${allTasks[i].date} class="relative bgr-input" type="date" id="editdate${i}" min="">
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <textarea style="border-radius: 5px;" id="description_edit${i}" rows="5">${allTasks[i].description}</textarea>
    <div class="task-footer">
                        <select style="border-radius: 5px;" class="input relative" value="${allTasks[i].category}" id="category_change${i}">
                        </select>
        <div class="task-action-btn"> <button style="border-radius: 5px; background-color: rgb(93, 156, 112);" onclick="changetask(${i})" <span class="material-symbols-outlined">
        edit
        </span>
        </div>
    </div>
</div>
`;
    }

    function changetask(i) {
        let editTitle = document.getElementById('title_edit'+ i).value;
        allTasks[i].title = editTitle;
        let editDate = document.getElementById('editdate'+i).value;
        allTasks[i].date=editDate;
        let editDescription= document.getElementById('description_edit'+i).value;
        allTasks[i].description= editDescription;
        let editCategory=document.getElementById('category_change'+i).value;
        allTasks[i].category=editCategory
        renderTaskstoBoard()
    }


    function renderCategory(i) {
        let categories = ['Marketing', 'Sale', 'IT']
        let selectedcategory = allTasks[i].category;
        let html = document.getElementById('category_change' + i);

        for (let j = 0; j < categories.length; j++) {
            if (selectedcategory == categories[j]) {
                html.innerHTML += `<option selected>${categories[j]}</option>`;
            }
            else {
                html.innerHTML += `<option>${categories[j]}</option>`;
            }
        }
    }

    function assignedto(i){
        for (let k=0; k<users.length; k++)
        {document.getElementById('assigned' + i).innerHTML += `<div onclick="changeassign(${i},${k})"  class="user"><img id="user${k}" class="member-img" src="${users[k]['profileimage']}"></img></div>`;
        checkassign(i,k)
    }
}

    function checkassign(i,k){
        for (let j = 0; j < allTasks[i].assigned.length; j++) {
        if (users[k].userId == allTasks[i].assigned[j]['id'])
                document.getElementById('user' + k).classList.add('edit')
    }
}

function changeassign(i,k){}
// if user ist assigned methode delete else add

    //     let assign=[1,2,3,4]
    //     let assigntotask= allTasks[i].assigned
    //     for(let k=0; k< assigntotask.length; k++){
    //         for(let j = 0; j < assign.length; j++) {
    //             if(assigntotask[k] == assign[j])
    //             document.getElementById('assigned'+i).innerHTML 
    //     }
    //     for (let j = 0; j < allTasks[i].assigned.length; j++) {
    //         const assigned = allTasks[i].assigned[j]['id'];
    //         let user = users.filter(f => f.userId == assigned);
    //         document.getElementById('assigned' + i).innerHTML += `<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;
    //         document.getElementById('assigned'+i).innerHTML 
    //     }

    // }
