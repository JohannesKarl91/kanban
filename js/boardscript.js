let currentDraggedElement;

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
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].location == "board")
            for (let status = 0; status < progresses.length; status++) {
                const progress = progresses[status];
                let boardcolum = document.getElementById(progress);
                    const task = tasks[i];
                    if (task.status == progress) {
                        boardcolum.innerHTML += generateHTML(i, progress);
                        colors(i);
                        taskassigned(i);
                        timestamp(i)
                    }
                }
            }
    }

    function timestamp(i){
        if (tasks[i].edited =! null){
            date=tasks[i].edited;
        document.getElementById('changed'+i).textContent ='';
        document.getElementById('changed'+i).textContent += `last change: `;
        document.getElementById('changed'+i).textContent += new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeStyle: 'long' }).format(date);

        }
    }

    function colors(i) {
        let color = tasks[i].urgency
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
        for (let j = 0; j < tasks[i].assigned.length; j++) {
            const assigned = tasks[i].assigned[j]['id'];
            let user = users.filter(f => f.userId == assigned);
            //console.log("user", user);
            document.getElementById('assigned' + i).innerHTML += `<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;

        }
    }

    function generateHTML(i, progress) {
        return ` <div id="taskat${i}" draggable="true" ondragstart="startDragging(${i})" class="task-card">
    <div id='header${i}' style="background-color: black" class="task-header">
        <div class="task-title">
            <h4>${tasks[i].title}</h4>
        </div>
        <div class="task-delete-btn"><span onclick="deletetask(${i})">&#x1F5D1;</span></div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <img src="./img/icons8-calendar-150.png" class="calendar-img">
            <span>${tasks[i].date}</span>
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <div class="task-description">
        <span>${tasks[i].description}</span>
    </div>
    <div class="task-footer">
        <div class="task-category"><span>${tasks[i].category}</span></div>
        <div class="boardBtnSection">
            <img onclick="openedit(${i})" style="width: 20px; height: 20px;" class="member-img" src="./img/edit.svg">
            <div class="task-action-btn" onclick="nextsection(${i},'${progress}')">
                <span>&#10149;</span>
            </div>
        </div>
        <div class="infochanged" id="changed${i}"></div>
    </div>
</div>
`;
    }


    function allowDrop(ev) {
        ev.preventDefault();

    }

    function highlight(id) {
        document.getElementById(id).classList.add('boardSectionField-highlight');
    }

    function removeHighlight(id) {
        document.getElementById(id).classList.remove('boardSectionField-highlight');
    }

    function startDragging(index) {
        currentDraggedElement = index;
    }

    function moveto(newstatus) {
        tasks[currentDraggedElement].status = newstatus;
        updateBoardTasksToBackend();
        renderTaskstoBoard();
    }

    function deletetask(position) {
        tasks.splice(position,1)
                updateBoardTasksToBackend();
                renderTaskstoBoard()
    }


    function nextsection(position, progress) {
        currentDraggedElement = position;
        if (progress == 'todo') {
            tasks[currentDraggedElement].status = 'inprogress';
        }
        if (progress == 'inprogress') {
            tasks[currentDraggedElement].status = 'testing';
        }
        if (progress == 'testing') {
            tasks[currentDraggedElement].status = 'done';
        }
        if (progress == 'done') {
            tasks[currentDraggedElement].status = 'todo';
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
        return `<div id="taskat${i}"class="task-card-edit" >
    <div class="column" id='header${i}' style="background-color:" class="task-header">
        <div class="task-title">
            <input id="title_edit${i}" type="text" style="border-radius: 5px; width:90%" placeholder="Bitte Titel eingeben" value='${tasks[i].title}'>
            <img onclick="disappearEdit()" class="backlogElementBtn" src="./img/close.svg">
        </div>
    </div>
    <div class="task-meta-info">
        <div class="task-duedate">
            <input onclick="duedate2(${i})" style="border-radius: 5px;" value=${tasks[i].date} class="relative bgr-input" type="date" id="editdate${i}" min="">
        </div>
        <div class="task-assigned" id="assigned${i}">
        </div>
    </div>
    <textarea class="textarea-edit" id="description_edit${i}" rows="5">${tasks[i].description}</textarea>
    <div class="task-footer">
                        <select style="border-radius: 5px;" class="input relative" value="${tasks[i].category}" id="category_change${i}">
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
        tasks[i].title = editTitle;
        let editDate = document.getElementById('editdate'+i).value;
        tasks[i].date=editDate;
        let editDescription= document.getElementById('description_edit'+i).value;
        tasks[i].description= editDescription;
        let editCategory=document.getElementById('category_change'+i).value;
        tasks[i].category=editCategory;
        renderTaskstoBoard();
        stamp(i);
        updateBoardTasksToBackend();

    }

    function stamp(i){
        let date = new Date();
        document.getElementById('changed'+i).innerHTML = `last change: `;
        document.getElementById('changed'+i).innerHTML += new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeStyle: 'long' }).format(date);
        let date_editet=date.getTime()
        tasks[i].edited=date_editet;
    }


    function renderCategory(i) {
        let categories = ['Marketing', 'Sale', 'IT']
        let selectedcategory = tasks[i].category;
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
        for (let j = 0; j < tasks[i].assigned.length; j++) {
        if (users[k].userId == tasks[i].assigned[j]['id'])
                document.getElementById('user' + k).classList.add('edit')
    }
}

function disappearEdit(){
    renderTaskstoBoard();
}

function changeassign(i,k){
    k++;
   if (tasks[i].assigned.some(any => any.id == k)){
       deleteperson(i,k);
   }
   else{
       addperson(i,k);
   }    
}

function addperson(i,k){
    tasks[i].assigned.push({id: k});
    k--;
    document.getElementById('user' + k).classList.add('edit')
}

function deleteperson(i,k){
    let index=(tasks[i].assigned.findIndex(elem => elem.id ==k));
    tasks[i].assigned.splice(index,1);
    k--;
    document.getElementById('user' + k).classList.remove('edit')
}
