let tasks= [];

async function initBoard() {
    await initUsers();}
// async function initTasks(){
//     tasks = JSON.parse(backend.getItem('tasks')) || [];
// }


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
        'date': date.value,
        'assigned':[]
    };

    addTask(task);

}

function addTask(task){

    tasks.push(task);
    // backend.setItem('tasks', JSON.stringify(tasks));
    title.value='';
    description.value='';
}


function DropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function imageInfos(id, picture){
let infos={
    'id': id,
    'bild': picture
};
// allTasks.assigned.push(infos);
document.getElementById('images').innerHTML += `<div><img id="picture" class="assigned_img" src="${picture}"></img>`;
}
