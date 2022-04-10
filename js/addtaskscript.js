
let allTasks=[];
setURL('http://gruppe-221.developerakademie.net/smallest_backend_ever');



function CreateTask(){
    let title = document.getElementById('title');
    let date= document.getElementById('date');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let urgency = document.getElementById('urgency')


    let task={
        'title': title.value,
        'category': category.value,
        'description': description.value,
        'urgency': urgency.value,
        'date': date,
        'assigned':[]
    };

    addTask(task);

}

function addTask(task){

    allTasks.push(task);
    backend.setItem('tasks', JSON.stringify(allTasks));
    title.value='';
    description.value='';
    addTasksToServer(task);

}

async function addTasksToServer(allTasks) {
    allTasks.push(task);
    await saveJSONToServer('allTasks');
}

function DropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function imageInfos(prename, name, picture){
let infos={
    'Vorname': prename,
    'Nachname': name,
    'bild': picture
};
document.getElementById('images').innerHTML += `<div><img id="picture" class="assigned_img" src="${picture}"></img>`;
}
