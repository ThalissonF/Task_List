const taskList = document.querySelector('#taskList');
const textBox = document.querySelector('#textBox');
const addButton = document.querySelector('#addButton');
const dropDownMenu = document.querySelector('#dropDownMenu');

addButton.addEventListener('click', function(){
    
    const taskText = textBox.value;
    textBox.value = '';
    taskList.appendChild(addTask(taskText));
    hideShowDropDownMenu();
    textBox.focus();

});

function addTask(taskText){

    if(taskText != ''){

        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');

        spanElement.setAttribute('id', 'task');
        spanElement.textContent = taskText;

        liElement.className = 'notCompleted';
        liElement.appendChild(spanElement);
        liElement.appendChild(addRemoveButton());

        spanElement.addEventListener('click', function(){
            if(this.id === 'task'){
                if(this.parentNode.className === 'notCompleted'){
                    this.parentNode.className = 'completed'
                }
                else{
                    this.parentNode.className = 'notCompleted'
                }
            }
        })

        return liElement;
    }    

}

function addRemoveButton(){

    const removeButton = document.createElement('button');

    removeButton.textContent = '✖';
    removeButton.className = 'remove';

    removeButton.addEventListener('click', function(){
        taskList.removeChild(this.parentNode);
        hideShowDropDownMenu();
    })

    return removeButton;

}

function hideShowDropDownMenu(){

    const spanElement = document.querySelector('#task');

    if(spanElement === null){
        dropDownMenu.setAttribute('hidden', 'hidden');
    }
    else{
        dropDownMenu.removeAttribute('hidden');
    }
}

dropDownMenu.addEventListener('change', function(){
    if(dropDownMenu.selectedIndex === 1 || dropDownMenu.selectedIndex === 2){
        
        const tasksVector = taskList.querySelectorAll('#task');

        for(task of tasksVector){
            task.dispatchEvent(new Event('click'));
        }
    }
    else if(dropDownMenu.selectedIndex === 3){

        const buttonVector = taskList.querySelectorAll('.remove');

        for(button of buttonVector){
            button.dispatchEvent(new Event('click'));
        }
    }
});