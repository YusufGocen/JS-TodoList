const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterinput=document.querySelector("#todoSearch")

let todos=[];

runEvents();

function runEvents() {
    form.addEventListener("submit", addtodo);
    document.addEventListener("DOMContentLoaded",pageloaded);
    secondCardBody.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click",AllclearTodo);
    filterinput.addEventListener("keyup",filter);
}

// SearchTodo

function filter(e){
    const filtervalue=e.target.value.toLowerCase().trim();
    const todoListesi=document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filtervalue)){
                todo.setAttribute("style","display:block");
            }else{
                todo.setAttribute("style","display:none !important");
            }
        })
    }else{
        showalert("danger","There is nothing to search");
    }
}

// AllclearTodo
function AllclearTodo(){
    const Todolist=document.querySelectorAll(".list-group-item");
    if(Todolist.length>0){
        Todolist.forEach(function(todo){
            todo.remove();
        })
        // StorageDelete
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showalert("success","All Todo Deleted");
    }else{
        showalert("danger","There is nothing to delete");
    }
}

// TodoSave
function pageloaded(){
    checktodostorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
// StorageDelete
function removetodoStorage(removetodo){
    checktodostorage();
    todos.forEach(function(todo,index){
        if(removetodo==todo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

// DeleteTodo
function removeTodoUI(e){
    if(e.target.className=="fa fa-remove"){
        const todo=e.target.parentElement.parentElement;
        todo.remove();
        showalert("success","Todo Deleted");
        // DeleteStorage
        removetodoStorage(todo.textContent);
    }

}
// WarningTodo
function addtodo(e){
    const inputText =addInput.value.trim();
    if(inputText==null ||inputText==""){
        showalert("danger","Please Enter ToDo");
    }else{
        addTodoToUI(inputText);
        addtodostorage(inputText);
        showalert("success","Todo added");
    }
    e.preventDefault();
}
// AppendChild
function addTodoToUI(newtodo){
    const li=document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newtodo;

    const a=document.createElement("a");
    a.href="#";
    a.className="delete-item"

    const i =document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}
// Alert
function showalert(type,message){
    const div=document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent=message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500 );
}

// StorageSave
function addtodostorage(newtodo){
    checktodostorage();
    todos.push(newtodo);
    localStorage.setItem("todos",JSON.stringify(todos));    
}
function checktodostorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}
