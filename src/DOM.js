import Handler from './Handler';
import { formMarkdown } from './Markdown';

class DOM {
  constructor() {}

  renderToDo = (todo) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const todoEl = document.createElement('div');
    const todoFull = document.createElement('div');
    const deleteBtn = document.createElement('div');
    todoEl.classList.add('todo');
    todoEl.textContent = todo.title;
    todoEl.classList.add(`${todo.priority}`);
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('delete');
    todoEl.appendChild(deleteBtn);
    li.appendChild(todoEl);

    todoFull.classList.add('todo-full');
    todoFull.insertAdjacentHTML(
      'afterbegin',
      `
    <p>Title: ${todo.title}</p>
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
}

export default new DOM();
