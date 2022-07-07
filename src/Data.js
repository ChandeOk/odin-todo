export default class Data {
  constructor() {
    this.projects = [];
    this.activeProject;
    console.log(this.projects);
  }

  addProject(project) {
    this.projects.push(project);
    return this.projects;
  }
  removeProject(project) {}
}
