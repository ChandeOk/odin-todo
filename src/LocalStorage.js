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
    // console.log(this.todos);
    // const JSONstring = JSON.stringify(this.todos);
    const result = JSON.parse(todosJSON);
    const result2 = JSON.parse(todosJSON);
    // console.log(result);

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
    // console.log(result);
    return result;
  }

  getProjects(projectsJSON) {
    // const JSONprojects = JSON.stringify(this.projects);
    let result = JSON.parse(projectsJSON);
    // console.log(this.projects);
    console.log('--------------0-0-0-0-0-0-0-0');
    console.log(result);
    const result2 = result.map((project) => new Project(project.name));
    const result3 = result2.map((obj, i) => Object.assign(obj, result[i]));
    // console.log(result);
    return result3;
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

  saveData(base) {
    const baseJSON = JSON.stringify(base);
    const projectsJSON = JSON.stringify(base.projects);
    const todosJSON = JSON.stringify(
      base.projects.map((project) => project.todos)
    );

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
    //TESTTTTTTTTTTTTTTTTTTTTTTT

    baseResult.activeProject = baseResult.projects[0];
    console.log(baseResult);

    return baseResult;
  }

  loadData() {
    const baseResult = this.getBase(localStorage.getItem('base'));
    const projectsResult = this.getProjects(localStorage.getItem('projects'));
    const todosResult = this.getToDos(localStorage.getItem('todos'));

    console.log(todosResult);
    console.log(projectsResult);
    console.log(baseResult);

    for (let i = 0; i < projectsResult.length; i++) {
      projectsResult[i].todos = todosResult[i];
    }

    console.log('--------------------------------');
    baseResult.projects = projectsResult;
    //TESTTTTTTTTTTTTTTTTTTTTTTT

    baseResult.activeProject = baseResult.projects[0];
    console.log(baseResult);
    return baseResult;
  }
}

//Сначала создаем инстанс класса со свойствами из JSON =>
//Остальное восстанавливаем через Object.assign
