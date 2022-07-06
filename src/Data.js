export default class Data {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
    return this.projects;
  }
  removeProject(project) {}
}
