let backlogCounter = 0;
let tasks = [];


/**
 * Initialize the backlog content by body onload funcionality. 
 */
async function initBacklog() {
    await initUsers();
    await loadTasks();
    includeHTML();
    navHighlightDesktop('navbarAnchor1', 'navbarLine1');
    navHighlightMobile('navbarAnchor5', 'navbarLine5');
    renderBacklogItems();
}


/**
 * Loads all tasks from the backend in list 'tasks'.
 */
async function loadTasks() {
    tasks = await JSON.parse(backend.getItem('tasks')) || [];
    console.log('tasks', tasks);
}


/**
 * Renders the backlog list initially.
 */
function renderBacklogItems() {
    checkEmptyArray();
    cleanBacklogContentRow();
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]['location']);
        if (tasks[i]['location'] == 'backlog') {
            renderBacklogCardTemplate(i);
            backlogCounter = backlogCounter + 1;
        }
    }
    checkEmptyArray(backlogCounter);
    backlogCounter = 0;
}


/**
 * Renders the backlog template list.
 * @param {*} i 
 */
function renderBacklogCardTemplate(i) {
    let backlogItem = tasks[i];
    let background = backlogItem['urgency'];
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    backlogContentRow.innerHTML += /*html*/`
    <div onclick="openBacklogEditMode(${i})" id="backlogElementField(${i})" class="backlogElementField">
        <div id="backlogEditContainer${i}"></div>
        <div id="assigned${i}" class="backlogElement"></div>
        <div class="backlogElement">${backlogItem['category']}</div>
        <div class="backlogElementTitleDescription">
            <div class="titleElement">${backlogItem['title']}</div>
            <div class="descriptionElement">${backlogItem['description']}</div>
        </div>
        <div class="backlogElementContainer">
            <a title="edit task"><img class="backlogElementBtn" src="./img/edit.svg"></a>
            <a onclick="deleteBacklogItem(${i})" title="delete"><img class="backlogElementBtn" src="./img/delete.svg"></a>
            <a onclick="addBacklogItem(${i})" title="send to board"><img class="backlogElementBtn" src="./img/send.svg"></a>
        </div>
    </div>
`;
    renderAssignedImg(i);
    document.getElementById(`backlogElementField(${i})`).classList.add('border-left-' + background);
}


function openBacklogEditMode(i) {
    let content = document.getElementById(`backlogEditContainer${i}`);
    content.innerHTML = backlogEditor(i);
    renderBacklogCategory(i);
    assignedTo(i);
}


function backlogEditor(i) {
    return /*html*/ `<div id="backlogEditItem${i}" class="backlog-card-edit">
        <div class="column" id='backlogHeader${i}' class="task-header">
            <div class="task-title">
                <input id="backlogTitle_edit${i}" type="text" style="border-radius: 5px; width: 150px;" placeholder="Bitte Titel eingeben" value='${tasks[i].title}'> 
            </div>
        </div>
        <div class="backlog-meta-info">
            <div class="task-duedate">
                <input onclick="BacklogDuedate2(${i})" style="border-radius: 5px; width: 150px;" value=${tasks[i].date} class="relative bgr-input" type="date" id="backlogEditdate${i}" min="">
            </div>
            <div class="task-assigned" id="backlogAssigned${i}"></div>
        </div>
        <textarea class="textField" style="border-radius: 5px;" id="backlogDescription_edit${i}" rows="5">${tasks[i].description}</textarea>
        <div class="task-footer">
                            <select style="border-radius: 5px;" class="input relative" value="${tasks[i].category}" id="backlogCategory_change${i}">
                            </select>
            <div class="task-action-btn"> <button style="border-radius: 5px; background-color: rgb(93, 156, 112);" onclick="changeBacklogItem(${i})" class="material-symbols-outlined">
                <img class="backlogElementBtn" src="./img/edit.svg">
            </div>
        </div>
    </div>
    `;
}


function changeBacklogItem(i) {
    let editTitle = document.getElementById('backlogTitle_edit' + i).value;
    tasks[i].title = editTitle;
    let editDate = document.getElementById('backlogEditdate' + i).value;
    tasks[i].date = editDate;
    let editDescription = document.getElementById('backlogDescription_edit' + i).value;
    tasks[i].description = editDescription;
    let editCategory = document.getElementById('backlogCategory_change' + i).value;
    tasks[i].category = editCategory;
    renderBacklogItems();
}


function assignedTo(i) {
    for (let j = 0; j < tasks[i].assigned.length; j++) {
        const assigned = tasks[i].assigned[j]['id'];
        let user = users.filter(f => f.userId == assigned);
        document.getElementById('backlogAssigned' + i).innerHTML += `<div class="user"><img class="member-img" src="${user[0]['profileimage']}"></img></div>`;

    }

}


function renderBacklogCategory(i) {
    let categories = ['Marketing', 'Sale', 'IT']
    let selectedcategory = tasks[i].category;
    let html = document.getElementById('backlogCategory_change' + i);

    for (let j = 0; j < categories.length; j++) {
        if (selectedcategory == categories[j]) {
            html.innerHTML += `<option selected>${categories[j]}</option>`;
        }
        else {
            html.innerHTML += `<option>${categories[j]}</option>`;
        }
    }
}


function BacklogDuedate2(i) {
    let Date = document.getElementById('editdate'+i);;
    Date.min = todayfix;
}


/**
 * Creates the imgs of the assigned persons.
 * @param {*} j 
 */
function renderAssignedImg(j) {
    for (let i = 0; i < tasks[j]['assigned'].length; i++) {
        const id = tasks[j]['assigned'][i]['id'];
        if (id !== 4) {
            checkImgAlex(j, id);
            checkImgJohannes(j, id);
            checkImgRebecca(j, id)
        }

        else {
            assignedImg = document.getElementById(`assigned${j}`);
            assignedImg.innerHTML += /*html */`
            <img class="backlogImg" src="./img/users/test.jpg">
            `;
        }
    }
}


/**
 * Compares the user id and renders the correct img to assigned person.
 * index: @param {*} j 
 * user id of assigned person: @param {*} id 
 */
function checkImgAlex(j, id) {
    if (id == 1) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
        <img class="backlogImg" src="./img/users/alex.jpg">
        `;
    }
}


/**
 * Compares the user id and renders the correct img to assigned person.
 * index: @param {*} j 
 * user id of assigned person: @param {*} id 
 */
function checkImgJohannes(j, id) {
    if (id == 2) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
        <img class="backlogImg" src="./img/users/johannes.jpg">
        `;
    }
}


/**
 * Compares the user id and renders the correct img to assigned person.
 * index: @param {*} j 
 * user id of assigned person: @param {*} id 
 */
function checkImgRebecca(j, id) {
    if (id == 3) {
        assignedImg = document.getElementById(`assigned${j}`);
        assignedImg.innerHTML += /*html */`
    <img class="backlogImg" src="./img/users/rebecca.jpg">
    `;
    }
}


/**
 * Check backlog array whether it is empty. If backlog array is empty,
 *then backlog overview disapears and shows a text.
*/
function checkEmptyArray(backlogConter) {
    let textByEmptyArray = document.getElementById('emptyArray');

    if (backlogConter == 0) {
        console.log('Array is empty!');
        textByEmptyArray.innerHTML = 'There is no backlog available. Please add some tasks!';
        document.getElementById('backlogContent').classList.add('d-none');
        document.getElementById('emptyArray').classList.remove('d-none');
    }
}


/**
 * Delete backlog item in beacklog array via the trash button.
 */
function deleteBacklogItem(i) {
    tasks.splice(i, 1);
    updateBoardTasksToBackend();
    renderBacklogItems();

}


/**
 * Add backlog item into board array via the send button.
 * @param {*} index 
 */
function addBacklogItem(index) {
    let array = tasks[index];
    array['location'] = 'board';
    //console.log('Array location is', array['location']);
    updateBoardTasksToBackend();
    renderBacklogItems();
    showBacklogAddedToBoard();
}


/**
 * 
 * @returns Empty value for Id: 'backlogContentTaskAsElement'.
 */
function cleanBacklogContentRow() {
    let backlogContentRow = document.getElementById('backlogContentTaskAsElement');
    return backlogContentRow.innerHTML = '';
}

/**
 * Updates the local array "tasks" to the backend in string element "tasks"
 */
async function updateBoardTasksToBackend() {
    let boardArrayAsJSON = tasks;
    //console.log('Loaded array to backlog', boardArrayAsJSON);
    await backend.setItem('tasks', JSON.stringify(boardArrayAsJSON));
}


/**
 * Shows a confirmation for sending the backlog item to KANBAN board.
 */
function showBacklogAddedToBoard() {
    let backlogPopup = document.getElementById("backlogSnackbar");
    backlogPopup.classList.add('showSnack');
    setTimeout(function () {
        backlogPopup.classList.remove('showSnack');;
    }, 5000);
}
