import Data from './Data.js';
import Project from './Project.js';
import ToDo from './ToDo.js';
import DOM from './DOM.js';
import ObjectHelper from './LocalStorage.js';
import { generateRandomNum } from './Markdown.js';

const initDefaultProject = () => {
  const project1 = new Project('Project Default');
  const todo1 = new ToDo('Gogogo', 'odin', 'today', 'low');

  todo1.parentId = 1;
  todo1.setId(1);
  project1.addToDo(todo1);
  project1.setId(1);
  base.addProject(project1);
  base.activeProject = base.projects[0];
};
const initRender = () => {
  DOM.renderAllProjectPreview(base);
  DOM.rednerAllToDoPreview(base);
  DOM.renderAllToDo(activeProject.todos);
};
const handlerSubmit = function (event) {
  event.preventDefault();
  const { title, description, date, priority } = Object.fromEntries(
    new FormData(this)
  );
  const todo = new ToDo(title, description, date, priority);
  todo.setId(generateRandomNum());
  todo.setParentId(activeProject.id);
  activeProject.addToDo(todo);
  DOM.renderToDo(...activeProject.todos.slice(-1));
  helper.saveData(base);
  DOM.renderToDoPreview(todo);
};
const handlerDelete = function (event) {
  const btnClose = event.target.closest('.delete');
  if (!btnClose) return;
  const selectedToDo = btnClose.closest('li');
  activeProject.removeToDo(+selectedToDo.dataset.id);
  selectedToDo.remove();
  DOM.clearToDoPreview();
  DOM.rednerAllToDoPreview(base);
  helper.saveData(base);
};
const handlerNewProject = function (event) {
  event.preventDefault();
  const projectName = this.querySelector('input').value;
  const newProject = new Project(projectName);
  newProject.setId(generateRandomNum());
  base.addProject(newProject);
  this.querySelector('input').value = '';
  // if (btnNew.classList.contains('hidden')) btnNew.classList.remove('hidden');

  DOM.renderProjectPreview(newProject);
};
const handlerChangeActivePorject = function (event) {
  const activeProjectSelect = event.target.closest('.project-preview');
  if (!activeProjectSelect) return;
  if (activeProjectSelect.textContent === activeProject.name) return;
  activeProject = base.projects.find(
    (project) => project.name === activeProjectSelect.textContent
  );
  base.activeProject = activeProject;
  if (btnNew.classList.contains('hidden')) btnNew.classList.remove('hidden');
  if (!warning.classList.contains('hidden')) warning.classList.add('hidden');

  DOM.renderAllToDo(activeProject.todos);
};
const handlerShowFullInfo = function (event) {
  const todoShowBtn = event.target.closest('.show-full');
  if (!todoShowBtn) return;
  todoShowBtn.textContent = todoShowBtn.textContent === '+' ? '-' : '+';
  DOM.todoShow(todoShowBtn.closest('.todo').nextSibling);
};
const handlerMarkAsFinished = function (event) {
  const btnMarkAsFinished = event.target.closest('.finish');
  if (!btnMarkAsFinished) return;
  const todo = btnMarkAsFinished.closest('li');
  activeProject.findToDoByID(+todo.dataset.id).markAsFinished();
  DOM.toggleFinishedMark(todo);
  DOM.clearToDoPreview();
  DOM.rednerAllToDoPreview(base);
  helper.saveData(base);
};
const handlerDeleteProject = function () {
  base.removeProject();
  DOM.clearAllProjectPreview();
  DOM.renderAllProjectPreview(base);
  DOM.rednerAllToDoPreview(base);
  DOM.clearToDoList();
  helper.saveData(base);
  btnNew.classList.add('hidden');
  warning.classList.remove('hidden');
};
const handlerToDoPreviewChageActive = function (event) {
  const clicked = event.target.closest('.todo-preview');
  if (!clicked) return;
  activeProject = base.projects.find(
    (project) => project.id === +clicked.dataset.parent
  );
  base.activeProject = activeProject;
  if (btnNew.classList.contains('hidden')) btnNew.classList.remove('hidden');
  if (!warning.classList.contains('hidden')) warning.classList.add('hidden');
  DOM.renderAllToDo(activeProject.todos);
};

console.log('START');
let base = new Data();

const helper = new ObjectHelper(base);

initDefaultProject();

let activeProject = base.activeProject;
base =
  localStorage.getItem('base') && localStorage.getItem('projects') !== '[]'
    ? helper.loadData()
    : base;

activeProject = base.activeProject;

initRender();

const warning = document.querySelector('.check-project');
const btnNew = document.querySelector('.new-todo-btn');
const formNewProject = document.querySelector('.project-form');
const aside = document.querySelector('aside');
const deleteProject = document.querySelector('.delete-project');

//EVENT LISTENERS

btnNew.addEventListener('click', function () {
  DOM.renderForm();
  document.querySelector('form').addEventListener('submit', handlerSubmit);
});

document.querySelector('ul').addEventListener('click', handlerDelete);

formNewProject.addEventListener('submit', handlerNewProject);

aside.addEventListener('click', handlerChangeActivePorject);

document.querySelector('ul').addEventListener('click', handlerShowFullInfo);

document.querySelector('ul').addEventListener('click', handlerMarkAsFinished);

deleteProject.addEventListener('click', handlerDeleteProject);

aside.addEventListener('click', handlerToDoPreviewChageActive);
