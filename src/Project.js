export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id;
  }

  addToDo(todo) {
    this.todos.push(todo);
  }
  removeToDo(id) {
    const todo = this.todos.findIndex((element) => element.id === id);
    this.todos.splice(todo, 1);
  }
  setId(id) {
    this.id = id;
  }
  findToDoByID(id) {
    const todoId = this.todos.findIndex((element) => element.id === id);
    return this.todos[todoId];
  }
}
