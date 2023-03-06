import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './uses-cases';


const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoImput: '#new-todo-input',
}


/**
 * 
 * @param {String} elementId Es el elmento html donde se va a rendirizar el html
 * que se recibe de app.html
 */

export const App = ( elementId ) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() ); 
        renderTodos( ElementIDs.TodoList, todos );

    };

    // Cuando la función App() se llama
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();


    })();

    //Referencias HTML
    const  newDescriptionInput = document.querySelector( ElementIDs.NewTodoImput );
    const  todoListUL = document.querySelector( ElementIDs.TodoList );
    const  clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);

    // Listeners 
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().lenght === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    } );
    
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id')); 
        displayTodos();      

    });

    todoListUL.addEventListener('click', (event) => {

        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]')
        if ( !element || !isDestroyElement ) return;

        todoStore.deleteTodo(element.getAttribute('data-id')); 
        displayTodos();
        
    clearCompletedButton.addEventListener('click',() =>{

        
        todoStore.deleteCompleted();
        displayTodos();
    })    

    });




}