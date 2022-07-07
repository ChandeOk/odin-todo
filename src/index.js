import Data from './Data.js';
import Project from './Project.js';
import ToDo from './ToDo.js';
import DOM from './DOM.js';

console.log('START');
const base = new Data();

const project1 = new Project('Project Default');

const todo1 = new ToDo('1', 'odin', 'today', 'low');
todo1.parentId = 1;
todo1.setId(1);
const todo2 = new ToDo('2', 'dva', 'today', 'low');
todo2.parentId = 1;
todo2.setId(2);
project1.addToDo(todo1);
project1.addToDo(todo2);
project1.setId(1);

const project2 = new Project('Project 2');
const todo3 = new ToDo('3', 'tri', 'today', 'high');
todo3.parentId = 2;
project2.addToDo(todo3);
project2.setId(2);

base.addProject(project1);

base.addProject(project2);

base.activeProject = project1;
let activeProject = base.activeProject;
console.log(base);
DOM.renderAllProjectPreview(base);
DOM.rednerAllToDoPreview(base);
// DOM.renderProjectPreview(project1);
DOM.renderAllToDo(activeProject.todos);
// console.log(base.projects.find((project) => project.name === 'project1'));

// console.dir(base);

// todo1.isFinished = true;
// console.dir(base);

const btnNew = document.querySelector('.new-todo-btn');
const formNewProject = document.querySelector('.project-form');
const aside = document.querySelector('aside');

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
  todo.setId(activeProject.todos.length + 1);
  todo.setParentId(activeProject.id);
  activeProject.addToDo(todo);
  DOM.renderToDo(...activeProject.todos.slice(-1));
  console.log(activeProject.todos.slice(-1));
  DOM.renderToDoPreview(todo);
};

document.querySelector('ul').addEventListener('click', (event) => {
  const btnClose = event.target.closest('.delete');
  if (!btnClose) return;
  const selectedToDo = btnClose.closest('li');
  activeProject.removeToDo(+selectedToDo.dataset.id);
  selectedToDo.remove();
  DOM.clearToDoPreview();
  DOM.rednerAllToDoPreview(base);
});

formNewProject.addEventListener('submit', function (event) {
  event.preventDefault();
  const projectName = this.querySelector('input').value;
  console.log(projectName);
  console.log('clickclack');
  const newProject = new Project(projectName);
  newProject.setId(base.projects.length + 1);
  base.addProject(newProject);
  this.querySelector('input').value = '';

  console.log(base.projects);
  console.log(base);
  DOM.renderProjectPreview(newProject);
});

aside.addEventListener('click', function (event) {
  const activeProjectSelect = event.target.closest('.project-preview');
  if (!activeProjectSelect) return;
  if (activeProjectSelect.textContent === activeProject.name) return;
  console.log('project selected');
  console.log(activeProjectSelect);
  // console.log('BASEEEEEEEE', base.projects);
  activeProject = base.projects.find(
    (project) => project.name === activeProjectSelect.textContent
  );
  // console.log(base);
  // activeProject.todos.push(new ToDo(1, 1, 1, 'low'));
  console.log(activeProject);
  DOM.renderAllToDo(activeProject.todos);
  // activeProject.todos.forEach((todo) => DOM.renderToDo(todo));
  console.log(activeProject.todos);
  console.log(base);
});

document.querySelector('ul').addEventListener('click', function (event) {
  const todoShowBtn = event.target.closest('.show-full');
  if (!todoShowBtn) return;
  console.log(todoShowBtn);
  todoShowBtn.textContent = todoShowBtn.textContent === '+' ? '-' : '+';
  DOM.todoShow(todoShowBtn.closest('.todo').nextSibling);
});

document.querySelector('ul').addEventListener('click', function (event) {
  const btnMarkAsFinished = event.target.closest('.finish');
  if (!btnMarkAsFinished) return;
  const todo = btnMarkAsFinished.closest('li');
  console.log(todo.dataset.id);
  console.log(activeProject.findToDoByID(+todo.dataset.id));
  activeProject.findToDoByID(+todo.dataset.id).markAsFinished();
  DOM.toggleFinishedMark(todo);
});

const jsonsos = JSON.stringify(base);
const unjsonsos = JSON.parse(jsonsos);
console.log(JSON.parse(jsonsos));
console.log(jsonsos);
unjsonsos.projects.forEach((project) => Object.assign(project, new Project()));
console.log(unjsonsos);
