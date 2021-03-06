import Handler from './Handler';
import { formMarkdown } from './Markdown';

class DOM {
  constructor() {}

  renderToDo = (todo) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const todoEl = document.createElement('div');
    const todoFull = document.createElement('div');
    const btnsContainer = document.createElement('div');
    const deleteBtn = document.createElement('div');
    const finishedButon = document.createElement('div');
    const showFullBtn = document.createElement('div');
    const title = document.createElement('div');
    title.classList.add('title-element');
    todoEl.classList.add('todo');
    title.textContent = todo.title;
    if (todo.isFinished) title.classList.add('finished');
    todoEl.classList.add(`${todo.priority}`);
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('delete');
    finishedButon.classList.add('finish');
    finishedButon.textContent = 'mark';
    showFullBtn.classList.add('show-full');
    showFullBtn.textContent = '+';
    btnsContainer.classList.add('btns-container');
    btnsContainer.appendChild(showFullBtn);
    btnsContainer.appendChild(finishedButon);
    btnsContainer.appendChild(deleteBtn);
    todoEl.appendChild(title);
    todoEl.appendChild(btnsContainer);
    li.appendChild(todoEl);

    todoFull.classList.add('todo-full');
    todoFull.classList.add(`hidden`);
    todoFull.classList.add(`${todo.isFinished ? 'finished' : 'nope'}`);
    todoFull.insertAdjacentHTML(
      'afterbegin',
      `
    
    <p>
      Description: ${todo.description}
    </p>
    <p>Date: ${todo.date}</p>`
    );
    li.appendChild(todoFull);
    li.setAttribute('data-id', `${todo.id}`);
    ul.appendChild(li);
  };

  renderForm() {
    if (document.querySelector('.new-form-container')) return;

    const container = document.querySelector('.container');
    const formContainer = document.createElement('div');
    formContainer.classList.add('new-form-container');

    const formEl = document.createElement('form');
    formEl.setAttribute('action', 'submit');
    formEl.insertAdjacentHTML('afterbegin', formMarkdown);
    formContainer.appendChild(formEl);
    container.insertAdjacentElement('afterbegin', formContainer);

    document
      .querySelector('.close-form')
      .addEventListener('click', function () {
        formContainer.remove();
      });
  }

  renderProjectPreview(project) {
    const projectEl = document.createElement('div');
    projectEl.classList.add('project');
    const projectPreview = document.createElement('div');
    projectPreview.classList.add('project-preview');

    projectPreview.textContent = `${project.name}`;
    projectEl.setAttribute('data-id', `${project.id}`);

    projectEl.appendChild(projectPreview);

    const parentElement = document.querySelector('.project-container');
    parentElement.appendChild(projectEl);
  }

  renderToDoPreview(todo) {
    const todoPreviewEl = document.createElement('div');
    todoPreviewEl.classList.add('todo-preview');
    todoPreviewEl.textContent = `${todo.title}`;
    if (todo.isFinished) todoPreviewEl.classList.add('finished-preview');
    todoPreviewEl.setAttribute('data-parent', `${todo.parentId}`);
    const project = document.querySelector(
      `.project[data-id='${todo.parentId}']`
    );

    project.insertAdjacentElement('beforeend', todoPreviewEl);
  }

  renderAllToDo(todos) {
    this.clearToDoList();
    todos.forEach((todo) => this.renderToDo(todo));
  }

  clearToDoList() {
    const toDoList = document.querySelector('.todos-list ul');
    toDoList.innerHTML = '';
  }

  todoShow(todo) {
    todo.classList.toggle('hidden');
  }

  renderAllProjectPreview(base) {
    base.projects.forEach((project) => this.renderProjectPreview(project));
  }

  rednerAllToDoPreview(base) {
    for (let i = 0; i < base.projects.length; i++) {
      base.projects[i].todos.forEach((todo) => this.renderToDoPreview(todo));
    }
  }

  clearToDoPreview() {
    const toDoPreviews = document.querySelectorAll('.todo-preview');
    toDoPreviews.forEach((preview) => preview.remove());
  }

  toggleFinishedMark(todo) {
    todo.querySelector('.title-element').classList.toggle('finished');
    todo.querySelector('.todo-full').classList.toggle('finished');
  }

  clearAllProjectPreview() {
    const projectPreviews = document.querySelectorAll('.project');
    projectPreviews.forEach((preview) => preview.remove());
  }
}

export default new DOM();
