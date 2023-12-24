/**
 * Here the script.js file write the script functionality
 * and append the ul and li tag in html the content
 * change dynamically.
 * 
 */

// Below the code for addTask
function addTask() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskname = document.getElementById('taskName').value.trim();

    if (taskname === '') {
        alert('Please Enter the task name');
        return;

    }
    else {
        const taskobj = {
            id: Date.now(),
            taskName: taskname,
            subtasks: []
        };

        console.log(taskobj);
        tasks.push(taskobj);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTask();
        alert('Task added successfully');
        location.reload();
    }

}

// below the code for show the tasks
function displayTask() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Below the code for loop the tasks obj
    tasks.forEach(task => {

        const li = document.createElement('li');
        li.textContent = task.taskName;

        // below the code for create the another input tag for sub task
        const subTaskInpt = document.createElement('input');
        subTaskInpt.type = 'text';
        subTaskInpt.placeholder = 'Enter your subtask';
        li.appendChild(subTaskInpt);
        
        // Below the code for sub task button
        const subTaskbtn = document.createElement('button');
        subTaskbtn.textContent = 'AddSubTask';
        subTaskbtn.addEventListener('click', () => {
            const subTaskValue  = subTaskInpt.value.trim(); 
            if(subTaskValue === ''){
                alert('Please Enter the sub task');
                return;
            }
            else {
                task.subtasks.push(subTaskValue);
                localStorage.setItem('tasks',JSON.stringify(tasks)); // Restore the local storage
                alert('Sub task added');
                displayTask();
            }
        })
        li.appendChild(subTaskbtn);

        // Below the code for the show the all sub task

        if(task.subtasks.length > 0){ // just validate the array index

            const subTaskList = document.createElement('ul');
            task.subtasks.forEach(subtask => {
                const subLi = document.createElement('li');
                subLi.textContent = subtask;
                subTaskList.appendChild(subLi); // append the ul inside the li
            });
            li.appendChild(subTaskList);
        }
         // Now append the all the list tags into the tasklist ul
         taskList.appendChild(li);
    });
}
displayTask();