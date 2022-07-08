export default class Data {
  constructor() {
    this.projects = [];
    this.activeProject;
  }

  addProject(project) {
    this.projects.push(project);
    return this.projects;
  }
  removeProject() {
    console.log(this.projects);

    const selected = this.projects.findIndex(
      (project) => project.name === this.activeProject.name
    );
    this.projects.splice(selected, 1);
    console.log(this.projects);
  }
}
