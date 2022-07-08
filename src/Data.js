export default class Data {
  constructor() {
    this.projects = [];
    this.activeProject;
  }

  addProject(project) {
    this.projects.push(project);
    return this.projects;
  }
  removeProject(project) {}
}
