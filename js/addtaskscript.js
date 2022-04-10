
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
        'date': date
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

imageInfos(prename, mail, picture)
    let information = {
        'firstname': prename,
        
        'Mail': mailadress,
        'picture': bild
    }


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }