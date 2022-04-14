let assigned=[];

async function initTasks() {
    await initUsers();}


function CreateTask(event){
    event.preventDefault(); 
    let title = document.getElementById('title');
    let date = validatedate('');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let urgency = document.getElementById('urgency')


    let task={
        'title': title.value,
        'category': category.value,
        'description': description.value,
        'urgency': urgency.value,
        'date': date.value,
        'assigned':assigned
    };

    addTask(task);

}

function addTask(task){

    allTasks.push(task);
    // backend.setItem('tasks', JSON.stringify(allTasks));   
    clearFormular(); 
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

function validatedate(){
    let date= document.getElementById('date').value;
    let todayinms = Date.now();
    let dateinms = Date.parse(date);

    if (todayinms>dateinms){
        alert('Das eingegebene Datum liegt in der Vergangenheit')
    }
    else{
        return date
    }
}

function clearFormular(){
    document.getElementById('images').innerHTML ='';
    document.getElementById('title').value='';
    document.getElementById('description').value='';
    assigned =[];
    document.getElementById('date').value='';
    document.getElementById('category').value='';
    document.getElementById('urgency').value='';




}