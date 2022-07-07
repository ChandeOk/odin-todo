import Data from './Data';
import Project from './Project';
import ToDo from './ToDo';

export default class ObjectHelper {
  constructor(base) {
    this.base = base;
    this.projects = base.projects;
    this.todos = this.projects.map((project) => project.todos);
  }

  getToDos(todosJSON) {
    // this.todos = this.projects.map((project) => project.todos);
    // console.log(this.todos);
    // const JSONstring = JSON.stringify(this.todos);
    const result = JSON.parse(todosJSON);
    // console.log(result);

    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].map(
        (obj) => new ToDo(obj.title, obj.description, obj.date, obj.priority)
      );
    }
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].map((obj, index) =>
        Object.assign(obj, this.todos[i][index])
      );
    }
    // console.log(result);
    return result;
  }

  getProjects(projectsJSON) {
    // const JSONprojects = JSON.stringify(this.projects);
    let result = JSON.parse(projectsJSON);
    // console.log(this.projects);
    // console.log(result);
    result = result.map((project) => new Project(project.name));
    result = result.map((obj, i) => Object.assign(obj, this.projects[i]));
    // console.log(result);
    return result;
  }

  getBase(baseJSON) {
    // const JSONbase = JSON.stringify(this.base);
    // console.log(JSONbase);
    const JSONresult = JSON.parse(baseJSON);
    // console.log(JSONresult);
    let result = new Data();
    result = Object.assign(result, JSONresult);
    // console.log(result);
    return result;
  }

  saveData() {
    const baseJSON = JSON.stringify(this.base);
    const projectsJSON = JSON.stringify(this.projects);
    const todosJSON = JSON.stringify(this.todos);

    localStorage.setItem('base', baseJSON);
    localStorage.setItem('projects', projectsJSON);
    localStorage.setItem('todos', todosJSON);

    console.log(baseJSON);
    console.log(projectsJSON);
    console.log(todosJSON);

    const baseResult = this.getBase(baseJSON);
    const projectsResult = this.getProjects(projectsJSON);
    const todosResult = this.getToDos(todosJSON);

    console.log(todosResult);
    console.log(projectsResult);
    console.log(baseResult);

    for (let i = 0; i < projectsResult.length; i++) {
      projectsResult[i].todos = todosResult[i];
    }

    console.log('--------------------------------');
    baseResult.projects = projectsResult;
    console.log(baseResult);

    return baseResult;
  }

  loadData() {}
}

//Сначала создаем инстанс класса со свойствами из JSON =>
//Остальное восстанавливаем через Object.assign
