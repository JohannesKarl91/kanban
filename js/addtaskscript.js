let allTasks=[];

function addTask(){
    let title = document.getElementById('title');
    let date= document.getElementById('date');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let urgency = document.getElementById('urgency')


    let task={
        'title': title,
        'category': category,
        'description': description,
        'urgency': urgency,
        'date': date
    };

}