export default class ToDo {
  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.isFinished = false;
    this.id;
    this.parentId;
  }

  markAsFinished() {
    this.isFinished = this.isFinished === false ? true : false;
  }

  setId(id) {
    this.id = id;
  }
  setParentId(parentId) {
    this.parentId = parentId;
  }
}
