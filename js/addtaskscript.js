setURL('http://gruppe-221.developerakademie.net/smallest_backend_ever');


let allTasks=[];


function addTask(){
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

    allTasks.push(task);

}