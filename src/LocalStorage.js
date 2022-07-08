import Data from './Data';
import Project from './Project';
import ToDo from './ToDo';

export default class ObjectHelper {
  constructor(base) {
    this.base = base;
    this.projects = base.projects;
    this.todos = this.projects.map((project) => project.todos);
    this.baseResult;
  }

  getToDos(todosJSON) {
    this.todos = this.projects.map((project) => project.todos);
    const result = JSON.parse(todosJSON);
    const result2 = JSON.parse(todosJSON);

    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].map(
        (obj) => new ToDo(obj.title, obj.description, obj.date, obj.priority)
      );
    }
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].map((obj, index) =>
        Object.assign(obj, result2[i][index])
      );
    }
    return result;
  }

  getProjects(projectsJSON) {
    let result = JSON.parse(projectsJSON);
    const result2 = result.map((project) => new Project(project.name));
    const result3 = result2.map((obj, i) => Object.assign(obj, result[i]));
    return result3;
  }

  getBase(baseJSON) {
    const JSONresult = JSON.parse(baseJSON);
    let result = new Data();
    result = Object.assign(result, JSONresult);
    return result;
  }

  saveData(base) {
    const baseJSON = JSON.stringify(base);
    const projectsJSON = JSON.stringify(base.projects);
    const todosJSON = JSON.stringify(
      base.projects.map((project) => project.todos)
    );

    localStorage.setItem('base', baseJSON);
    localStorage.setItem('projects', projectsJSON);
    localStorage.setItem('todos', todosJSON);

    const baseResult = this.getBase(baseJSON);
    const projectsResult = this.getProjects(projectsJSON);
    const todosResult = this.getToDos(todosJSON);

    for (let i = 0; i < projectsResult.length; i++) {
      projectsResult[i].todos = todosResult[i];
    }

    baseResult.projects = projectsResult;

    baseResult.activeProject = baseResult.projects[0];

    return baseResult;
  }

  loadData() {
    const baseResult = this.getBase(localStorage.getItem('base'));
    const projectsResult = this.getProjects(localStorage.getItem('projects'));
    const todosResult = this.getToDos(localStorage.getItem('todos'));

    for (let i = 0; i < projectsResult.length; i++) {
      projectsResult[i].todos = todosResult[i];
    }

    baseResult.projects = projectsResult;

    baseResult.activeProject = baseResult.projects[0];
    return baseResult;
  }
}

//Сначала создаем инстанс класса со свойствами из JSON =>
//Остальное восстанавливаем через Object.assign
