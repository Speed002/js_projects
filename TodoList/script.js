const list = document.getElementById('list')
const count = document.getElementById('count')
const form = document.getElementById('form')
const text = document.getElementById('text')

// let Todos = [
//     {id:1, text:'Another Entry'},
//     {id:2, text:'Second Entry'},
//     {id:3, text:'Third Entry'}
// ]

const localStorageTodos = JSON.parse(localStorage.getItem('todos'))
let Todos = localStorage.getItem('todos') !== null ? localStorageTodos : []

//Add todo
function addTodo(e){
    e.preventDefault()
    if(text.value === ''){
        alert('required field')
    }else{
        const todoItem = {
            id:randomId(),
            text: text.value
        }
        Todos.push(todoItem)
        showTodos(todoItem)
        updateLocalStorage()
        countTodos()
        text.value = ''
    }
}

//Generate Random ID
function randomId(){
    return Math.floor(Math.random() * 100000000)
}

// Show codes
function showTodos(todoItem){
    todo = document.createElement('li')
    todo.classList.add('minus')
    todo.innerHTML = `${todoItem.text} <button class='delete-btn' onclick='removeTodo(${todoItem.id})'>x</button>`
    list.appendChild(todo)
    
}

//update the localstorage
function updateLocalStorage(){
    localStorage.setItem('todos', JSON.stringify(Todos));
}

//Remove TodoItem
function removeTodo(id){
    Todos = Todos.filter(todoItem => todoItem.id !== id)
    updateLocalStorage()
    init()
}

// count the todoItems
function countTodos(){
    const ItemNo = Todos.length
    count.innerText = ItemNo
}

// initialize the app
function init(){
    list.innerHTML = ''
    Todos.forEach(showTodos)  
    countTodos() 
}

init()

//Events
form.addEventListener('submit', addTodo)