import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './uses-cases';


const ElementIDs = {
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

    // Listeners 
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().lenght === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    } ) 

}