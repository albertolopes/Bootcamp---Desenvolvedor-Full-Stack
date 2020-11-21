window.addEventListener('load', start);

var globalNames  = ['um', 'dois', 'tres', 'quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null; 

function start(){
    preventFormSubmit();    
    inputName = document.querySelector('#inputName');
    activateInput()
    render();
}

function preventFormSubmit(){    
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();
    }
}

function activateInput(){
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping)
    
    function handleTyping(event){        
        if(event.key === 'Enter' && !event.target.value){
            return;
        }else if(event.key === 'Enter'){
            if(isEditing){
                updateName(event.target.value)
            }else{
                insertName(event.target.value);
            }
            isEditing = false;
            clearInput();
        }
    }

    function insertName(name){
        globalNames.push(name);
        render();
    }

    function updateName(name){
        globalNames[currentIndex] = name;
        render();
    }
}

function render(){
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for(var i = 0; i < globalNames.length; i++){
        var currentName = globalNames[i];
        
        var li = document.createElement('li');

        li.appendChild(createDeleteButton(i));
        li.appendChild(createSpan(currentName, i));
        ul.appendChild(li);        
    }

    function createSpan(name, index){
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);
        
        return span;

        function editItem(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }
    }

    function createDeleteButton(index){
        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        
        button.addEventListener('click', deleteName);

        return button;

        function deleteName(){
            globalNames.splice(index, 1);
            render();
        }
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value = '';
    inputName.focus();
}