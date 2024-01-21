const data= new Date();

const todoForm= document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo-input");
const todoList= document.querySelector("#todo-list");
const editForm= document.querySelector("#edit-form");
const editInput= document.querySelector("#edit-input");
const cancelEditBtn= document.querySelector(".cancel-edit-btn");

let oldInputValue;

const timeElapsed= Date.now();
const today= new Date(timeElapsed);

document.getElementById("date").innerHTML=today.toDateString();

function time(){
    const data= new Date();
    let h= data.getHours();
    let m= data.getMinutes();
    let s= data.getSeconds();

    if (h<10)
        h="0" + h;
    if(m<10)
        m="0"+m;
    if(s<10)
        s="0"+s;

    document.getElementById("hour").innerHTML=h +":"+ m+":"+ s;
    setTimeout('time()',500);
}

todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputValue= todoInput.value;
    if (inputValue)
        saveTodo(inputValue);//Save the function

    //  //Save todos
    //  saveTodos();
});

const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText= text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML='<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML='<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();

     //Save todos
     saveTodos();
};

document.addEventListener("click",(e) => {
    const targetE1 = e.target;
    const parentE1 = targetE1.closest("div");
    let todoTitle;

    if(parentE1 && parentE1.querySelector("h3"))
        todoTitle = parentE1.querySelector("h3").innerText;

    if(targetE1.classList.contains("finish-todo"))
         parentE1.classList.toggle("done");

    if(targetE1.classList.contains("remove-todo"))
          parentE1.remove();

    if(targetE1.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

     //Save todos
     saveTodos();
});

const toggleForms= () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const editInputValue = editInput.value;
    if(editInputValue)
        updateTodo(editInputValue) //Will update value function

     toggleForms();
});

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue)
            todoTitle.innerText = text;
    });

    //Save todos
    saveTodos();
};

function saveTodos(){
    const todoItems= [];

    if(document.querySelectorAll('.todo').length>0){
        document.querySelectorAll(".todo").forEach((item) => {
            const todo= {id: Date.now(), text: item.innerText, completed: false};
            if(item.classList.contains("done")) {
                todo.completed = true;
            }
            todoItems.push(todo);
            localStorage.setItem("todoItems", JSON.stringify(todoItems));
        })
    }
    else
         localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function getTodoItems() {
    const storedTodoItems = localStorage.getItem("todoItems");
    return storedTodoItems ? JSON.parse(storedTodoItems) : [];
}

function displayTodoItems(){
    todoList.innerHTML= ""; //Set Initial value as null or empty string
    const savedTodos= getTodoItems();
    savedTodos.forEach((item) => {
            const todo = document.createElement("div");
            todo.classList.add("todo");

            const todoTitle = document.createElement("h3");
            todoTitle.innerText= text;
            todo.appendChild(todoTitle);

            const doneBtn = document.createElement("button");
            doneBtn.classList.add("finish-todo");
            doneBtn.innerHTML='<i class="fa-solid fa-check"></i>';
            todo.appendChild(doneBtn);

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-todo");
            editBtn.innerHTML='<i class="fa-solid fa-pen"></i>';
            todo.appendChild(editBtn);

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-todo");
            removeBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
            todo.appendChild(removeBtn);

          
            //Check if the todo item is completed or not
            if(item.completed) 
                todo.classList.add("done");

            todoList.appendChild(todo);
    
    });
}

// Call the display func
displayTodoItems();