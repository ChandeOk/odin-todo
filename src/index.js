import Data from './Data.js';
import Project from './Project.js';
import ToDo from './ToDo.js';
import DOM from './DOM.js';

console.log('START');
const base = new Data();

const project1 = new Project();

// const todo1 = new ToDo('1', 'odin', 'today', 'low');
// const todo2 = new ToDo('2', 'dva', 'today', 'low');
// project1.addToDo(todo1);
// project1.addToDo(todo2);

base.addProject(project1);

// console.dir(base);

// todo1.isFinished = true;
// console.dir(base);

const btnNew = document.querySelector('.new-todo-btn');
btnNew.addEventListener('click', function () {
  DOM.renderForm();
  document.querySelector('form').addEventListener('submit', handlerSubmit);
});

const handlerSubmit = function (event) {
  event.preventDefault();
  const { title, description, date, priority } = Object.fromEntries(
    new FormData(this)
  );
  const todo = new ToDo(title, description, date, priority);
  todo.setId(project1.todos.length + 1);
  project1.addToDo(todo);
  DOM.renderToDo(...project1.todos.slice(-1));
  console.log(project1.todos.slice(-1));
};

document.querySelector('ul').addEventListener('click', (event) => {
  const btnClose = event.target.closest('.delete');
  if (!btnClose) return;
  const selectedToDo = btnClose.closest('li');
  project1.removeToDo(+selectedToDo.dataset.id);
  selectedToDo.remove();
});
