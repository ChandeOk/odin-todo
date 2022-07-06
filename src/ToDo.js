export default class ToDo {
  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.isFinished = false;
    this.id;
  }

  markAsFinished() {
    this.isFinished = true;
  }

  setId(id) {
    this.id = id;
  }
}
