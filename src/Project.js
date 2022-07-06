export default class Project {
  constructor() {
    this.todos = [];
  }

  addToDo(todo) {
    // todo.setId(this.todos.length + 1);
    this.todos.push(todo);
  }
  removeToDo(id) {
    const todo = this.todos.findIndex((element) => element.id === id);
    this.todos.splice(todo, 1);
    console.log(this.todos);
  }
}
