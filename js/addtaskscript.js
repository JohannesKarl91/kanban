let assigned=[];

async function initTasks() {
    await initUsers();}


function CreateTask(event){
    event.preventDefault(); 
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
        'assigned':[assigned]
    };

    addTask(task);

}

function addTask(task){

    allTasks.push(task);
    // backend.setItem('tasks', JSON.stringify(allTasks));    
    title.value='';
    description.value='';
}


function DropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function imageInfos(id, picture){
    if (assigned.some(any =>any.id === id)){
   }
    else
    {

let infos={
    'id': id
};
assigned.push(infos);
document.getElementById('images').innerHTML += `<div><img id="picture" class="assigned_img" src="${picture}"></img>`;
}}
