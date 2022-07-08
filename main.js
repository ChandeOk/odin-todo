(() => {
  'use strict';
  class e {
    constructor() {
      (this.projects = []), this.activeProject;
    }
    addProject(e) {
      return this.projects.push(e), this.projects;
    }
    removeProject() {
      console.log(this.projects);
      const e = this.projects.findIndex(
        (e) => e.name === this.activeProject.name
      );
      this.projects.splice(e, 1), console.log(this.projects);
    }
  }
  class t {
    constructor(e) {
      (this.name = e), (this.todos = []), this.id;
    }
    addToDo(e) {
      this.todos.push(e);
    }
    removeToDo(e) {
      const t = this.todos.findIndex((t) => t.id === e);
      this.todos.splice(t, 1);
    }
    setId(e) {
      this.id = e;
    }
    findToDoByID(e) {
      const t = this.todos.findIndex((t) => t.id === e);
      return this.todos[t];
    }
  }
  class o {
    constructor(e, t, o, s) {
      (this.title = e),
        (this.description = t),
        (this.date = o),
        (this.priority = s),
        (this.isFinished = !1),
        this.id,
        this.parentId;
    }
    markAsFinished() {
      this.isFinished = !1 === this.isFinished;
    }
    setId(e) {
      this.id = e;
    }
    setParentId(e) {
      this.parentId = e;
    }
  }
  new (class {
    constructor() {}
  })();
  const s = () => Math.floor(999999999999998 * Math.random() + 1),
    i = new (class {
      constructor() {}
      renderToDo = (e) => {
        const t = document.querySelector('ul'),
          o = document.createElement('li'),
          s = document.createElement('div'),
          i = document.createElement('div'),
          r = document.createElement('div'),
          n = document.createElement('div'),
          d = document.createElement('div'),
          c = document.createElement('div'),
          a = document.createElement('div');
        a.classList.add('title-element'),
          s.classList.add('todo'),
          (a.textContent = e.title),
          e.isFinished && a.classList.add('finished'),
          s.classList.add(`${e.priority}`),
          (n.textContent = 'delete'),
          n.classList.add('delete'),
          d.classList.add('finish'),
          (d.textContent = 'mark'),
          c.classList.add('show-full'),
          (c.textContent = '+'),
          r.classList.add('btns-container'),
          r.appendChild(c),
          r.appendChild(d),
          r.appendChild(n),
          s.appendChild(a),
          s.appendChild(r),
          o.appendChild(s),
          i.classList.add('todo-full'),
          i.classList.add('hidden'),
          i.classList.add(e.isFinished ? 'finished' : 'nope'),
          i.insertAdjacentHTML(
            'afterbegin',
            `\n    \n    <p>\n      Description: ${e.description}\n    </p>\n    <p>Date: ${e.date}</p>`
          ),
          o.appendChild(i),
          o.setAttribute('data-id', `${e.id}`),
          t.appendChild(o);
      };
      renderForm() {
        if (document.querySelector('.new-form-container')) return;
        const e = document.querySelector('.container'),
          t = document.createElement('div');
        t.classList.add('new-form-container');
        const o = document.createElement('form');
        o.setAttribute('action', 'submit'),
          o.insertAdjacentHTML(
            'afterbegin',
            '<div class="field">\n<label for="title">Title: </label>\n<input type="text" name="title" id="title" required/>\n</div>\n<div class="field">\n<label for="description">Description: </label>\n<input type="text" name="description" id="description" required/>\n</div>\n<div class="field">\n<label for="date">Date: </label>\n<input type="date" name="date" id="date" required/>\n</div>\n<div class="radio-btn">\n<label for="low-prio">Low</label>\n<input type="radio" name="priority" id="low-prio" value="low" />\n<label for="med-prio">Medium</label>\n<input type="radio" name="priority" id="med-prio" value="med" />\n<label for="high-prio">High</label>\n<input type="radio" name="priority" id="high-prio" value="high" checked/>\n</div>\n<button type="submit">Submit</button>\n<div class="close-form"><div class="x">X</div></div>\n'
          ),
          t.appendChild(o),
          e.insertAdjacentElement('afterbegin', t),
          document
            .querySelector('.close-form')
            .addEventListener('click', function () {
              t.remove();
            });
      }
      renderProjectPreview(e) {
        const t = document.createElement('div');
        t.classList.add('project');
        const o = document.createElement('div');
        o.classList.add('project-preview'),
          (o.textContent = `${e.name}`),
          t.setAttribute('data-id', `${e.id}`),
          t.appendChild(o),
          document.querySelector('.project-container').appendChild(t);
      }
      renderToDoPreview(e) {
        const t = document.createElement('div');
        t.classList.add('todo-preview'),
          (t.textContent = `${e.title}`),
          e.isFinished && t.classList.add('finished-preview'),
          t.setAttribute('data-parent', `${e.parentId}`),
          document
            .querySelector(`.project[data-id='${e.parentId}']`)
            .insertAdjacentElement('beforeend', t);
      }
      renderAllToDo(e) {
        this.clearToDoList(), e.forEach((e) => this.renderToDo(e));
      }
      clearToDoList() {
        document.querySelector('.todos-list ul').innerHTML = '';
      }
      todoShow(e) {
        e.classList.toggle('hidden');
      }
      renderAllProjectPreview(e) {
        e.projects.forEach((e) => this.renderProjectPreview(e));
      }
      rednerAllToDoPreview(e) {
        for (let t = 0; t < e.projects.length; t++)
          e.projects[t].todos.forEach((e) => this.renderToDoPreview(e));
      }
      clearToDoPreview() {
        document.querySelectorAll('.todo-preview').forEach((e) => e.remove());
      }
      toggleFinishedMark(e) {
        e.querySelector('.title-element').classList.toggle('finished'),
          e.querySelector('.todo-full').classList.toggle('finished');
      }
      clearAllProjectPreview() {
        document.querySelectorAll('.project').forEach((e) => e.remove());
      }
    })(),
    r = function (e) {
      e.preventDefault();
      const {
          title: t,
          description: r,
          date: a,
          priority: l,
        } = Object.fromEntries(new FormData(this)),
        p = new o(t, r, a, l);
      p.setId(s()),
        p.setParentId(c.id),
        c.addToDo(p),
        i.renderToDo(...c.todos.slice(-1)),
        d.saveData(n),
        i.renderToDoPreview(p);
    };
  console.log('START');
  let n = new e();
  const d = new (class {
    constructor(e) {
      (this.base = e),
        (this.projects = e.projects),
        (this.todos = this.projects.map((e) => e.todos)),
        this.baseResult;
    }
    getToDos(e) {
      this.todos = this.projects.map((e) => e.todos);
      const t = JSON.parse(e),
        s = JSON.parse(e);
      for (let e = 0; e < t.length; e++)
        t[e] = t[e].map(
          (e) => new o(e.title, e.description, e.date, e.priority)
        );
      for (let e = 0; e < t.length; e++)
        t[e] = t[e].map((t, o) => Object.assign(t, s[e][o]));
      return t;
    }
    getProjects(e) {
      let o = JSON.parse(e);
      return o.map((e) => new t(e.name)).map((e, t) => Object.assign(e, o[t]));
    }
    getBase(t) {
      const o = JSON.parse(t);
      let s = new e();
      return (s = Object.assign(s, o)), s;
    }
    saveData(e) {
      const t = JSON.stringify(e),
        o = JSON.stringify(e.projects),
        s = JSON.stringify(e.projects.map((e) => e.todos));
      localStorage.setItem('base', t),
        localStorage.setItem('projects', o),
        localStorage.setItem('todos', s);
      const i = this.getBase(t),
        r = this.getProjects(o),
        n = this.getToDos(s);
      for (let e = 0; e < r.length; e++) r[e].todos = n[e];
      return (i.projects = r), (i.activeProject = i.projects[0]), i;
    }
    loadData() {
      const e = this.getBase(localStorage.getItem('base')),
        t = this.getProjects(localStorage.getItem('projects')),
        o = this.getToDos(localStorage.getItem('todos'));
      for (let e = 0; e < t.length; e++) t[e].todos = o[e];
      return (e.projects = t), (e.activeProject = e.projects[0]), e;
    }
  })(n);
  (() => {
    const e = new t('Project Default'),
      s = new o('Gogogo', 'odin', 'today', 'low');
    (s.parentId = 1),
      s.setId(1),
      e.addToDo(s),
      e.setId(1),
      n.addProject(e),
      (n.activeProject = n.projects[0]);
  })();
  let c = n.activeProject;
  (n =
    localStorage.getItem('base') && '[]' !== localStorage.getItem('projects')
      ? d.loadData()
      : n),
    (c = n.activeProject),
    i.renderAllProjectPreview(n),
    i.rednerAllToDoPreview(n),
    i.renderAllToDo(c.todos);
  const a = document.querySelector('.check-project'),
    l = document.querySelector('.new-todo-btn'),
    p = document.querySelector('.project-form'),
    u = document.querySelector('aside'),
    h = document.querySelector('.delete-project');
  l.addEventListener('click', function () {
    i.renderForm(),
      document.querySelector('form').addEventListener('submit', r);
  }),
    document.querySelector('ul').addEventListener('click', function (e) {
      const t = e.target.closest('.delete');
      if (!t) return;
      const o = t.closest('li');
      c.removeToDo(+o.dataset.id),
        o.remove(),
        i.clearToDoPreview(),
        i.rednerAllToDoPreview(n),
        d.saveData(n);
    }),
    p.addEventListener('submit', function (e) {
      e.preventDefault();
      const o = this.querySelector('input').value,
        r = new t(o);
      r.setId(s()),
        n.addProject(r),
        (this.querySelector('input').value = ''),
        i.renderProjectPreview(r);
    }),
    u.addEventListener('click', function (e) {
      const t = e.target.closest('.project-preview');
      t &&
        t.textContent !== c.name &&
        ((c = n.projects.find((e) => e.name === t.textContent)),
        (n.activeProject = c),
        l.classList.contains('hidden') && l.classList.remove('hidden'),
        a.classList.contains('hidden') || a.classList.add('hidden'),
        i.renderAllToDo(c.todos));
    }),
    document.querySelector('ul').addEventListener('click', function (e) {
      const t = e.target.closest('.show-full');
      t &&
        ((t.textContent = '+' === t.textContent ? '-' : '+'),
        i.todoShow(t.closest('.todo').nextSibling));
    }),
    document.querySelector('ul').addEventListener('click', function (e) {
      const t = e.target.closest('.finish');
      if (!t) return;
      const o = t.closest('li');
      c.findToDoByID(+o.dataset.id).markAsFinished(),
        i.toggleFinishedMark(o),
        i.clearToDoPreview(),
        i.rednerAllToDoPreview(n),
        d.saveData(n);
    }),
    h.addEventListener('click', function () {
      n.removeProject(),
        i.clearAllProjectPreview(),
        i.renderAllProjectPreview(n),
        i.rednerAllToDoPreview(n),
        i.clearToDoList(),
        d.saveData(n),
        l.classList.add('hidden'),
        a.classList.remove('hidden');
    }),
    u.addEventListener('click', function (e) {
      const t = e.target.closest('.todo-preview');
      t &&
        ((c = n.projects.find((e) => e.id === +t.dataset.parent)),
        (n.activeProject = c),
        l.classList.contains('hidden') && l.classList.remove('hidden'),
        a.classList.contains('hidden') || a.classList.add('hidden'),
        i.renderAllToDo(c.todos));
    });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RS9DaEUsRUFBS3ZFLGNBQWdCQSxFQUNqQm9ILEVBQU90RSxVQUFVb0YsU0FBUyxXQUFXZCxFQUFPdEUsVUFBVVksT0FBTyxVQUM1RHlELEVBQVFyRSxVQUFVb0YsU0FBUyxXQUFXZixFQUFRckUsVUFBVUMsSUFBSSxVQUNqRSxnQkFBa0IvQyxFQUFjWSxZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL0RhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL1RvRG8uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL01hcmtkb3duLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9Mb2NhbFN0b3JhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZVByb2plY3Q7XG4gIH1cblxuICBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cbiAgcmVtb3ZlUHJvamVjdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9qZWN0cy5maW5kSW5kZXgoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSB0aGlzLmFjdGl2ZVByb2plY3QubmFtZVxuICAgICk7XG4gICAgdGhpcy5wcm9qZWN0cy5zcGxpY2Uoc2VsZWN0ZWQsIDEpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICAgIHRoaXMuaWQ7XG4gIH1cblxuICBhZGRUb0RvKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH1cbiAgcmVtb3ZlVG9EbyhpZCkge1xuICAgIGNvbnN0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmRJbmRleCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gaWQpO1xuICAgIHRoaXMudG9kb3Muc3BsaWNlKHRvZG8sIDEpO1xuICB9XG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG4gIGZpbmRUb0RvQnlJRChpZCkge1xuICAgIGNvbnN0IHRvZG9JZCA9IHRoaXMudG9kb3MuZmluZEluZGV4KChlbGVtZW50KSA9PiBlbGVtZW50LmlkID09PSBpZCk7XG4gICAgcmV0dXJuIHRoaXMudG9kb3NbdG9kb0lkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9EbyB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuaXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuaWQ7XG4gICAgdGhpcy5wYXJlbnRJZDtcbiAgfVxuXG4gIG1hcmtBc0ZpbmlzaGVkKCkge1xuICAgIHRoaXMuaXNGaW5pc2hlZCA9IHRoaXMuaXNGaW5pc2hlZCA9PT0gZmFsc2UgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuICBzZXRQYXJlbnRJZChwYXJlbnRJZCkge1xuICAgIHRoaXMucGFyZW50SWQgPSBwYXJlbnRJZDtcbiAgfVxufVxuIiwiY2xhc3MgSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEhhbmRsZXIoKTtcbiIsImNvbnN0IGZvcm1NYXJrZG93biA9IGA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbjxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlOiA8L2xhYmVsPlxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiIHJlcXVpcmVkLz5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZpZWxkXCI+XG48bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogPC9sYWJlbD5cbjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIiByZXF1aXJlZC8+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuPGxhYmVsIGZvcj1cImRhdGVcIj5EYXRlOiA8L2xhYmVsPlxuPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImRhdGVcIiBpZD1cImRhdGVcIiByZXF1aXJlZC8+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJyYWRpby1idG5cIj5cbjxsYWJlbCBmb3I9XCJsb3ctcHJpb1wiPkxvdzwvbGFiZWw+XG48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInByaW9yaXR5XCIgaWQ9XCJsb3ctcHJpb1wiIHZhbHVlPVwibG93XCIgLz5cbjxsYWJlbCBmb3I9XCJtZWQtcHJpb1wiPk1lZGl1bTwvbGFiZWw+XG48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInByaW9yaXR5XCIgaWQ9XCJtZWQtcHJpb1wiIHZhbHVlPVwibWVkXCIgLz5cbjxsYWJlbCBmb3I9XCJoaWdoLXByaW9cIj5IaWdoPC9sYWJlbD5cbjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwicHJpb3JpdHlcIiBpZD1cImhpZ2gtcHJpb1wiIHZhbHVlPVwiaGlnaFwiIGNoZWNrZWQvPlxuPC9kaXY+XG48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbjxkaXYgY2xhc3M9XCJjbG9zZS1mb3JtXCI+PGRpdiBjbGFzcz1cInhcIj5YPC9kaXY+PC9kaXY+XG5gO1xuXG5jb25zdCBnZW5lcmF0ZVJhbmRvbU51bSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5OTk5OTk5OTk5OTk5OTkgLSAxKSArIDEpO1xufTtcblxuZXhwb3J0IHsgZm9ybU1hcmtkb3duLCBnZW5lcmF0ZVJhbmRvbU51bSB9O1xuIiwiaW1wb3J0IEhhbmRsZXIgZnJvbSAnLi9IYW5kbGVyJztcbmltcG9ydCB7IGZvcm1NYXJrZG93biB9IGZyb20gJy4vTWFya2Rvd24nO1xuXG5jbGFzcyBET00ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVuZGVyVG9EbyA9ICh0b2RvKSA9PiB7XG4gICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2RvRnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJ0bnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBmaW5pc2hlZEJ1dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgc2hvd0Z1bGxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWVsZW1lbnQnKTtcbiAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcbiAgICBpZiAodG9kby5pc0ZpbmlzaGVkKSB0aXRsZS5jbGFzc0xpc3QuYWRkKCdmaW5pc2hlZCcpO1xuICAgIHRvZG9FbC5jbGFzc0xpc3QuYWRkKGAke3RvZG8ucHJpb3JpdHl9YCk7XG4gICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gJ2RlbGV0ZSc7XG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZScpO1xuICAgIGZpbmlzaGVkQnV0b24uY2xhc3NMaXN0LmFkZCgnZmluaXNoJyk7XG4gICAgZmluaXNoZWRCdXRvbi50ZXh0Q29udGVudCA9ICdtYXJrJztcbiAgICBzaG93RnVsbEJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93LWZ1bGwnKTtcbiAgICBzaG93RnVsbEJ0bi50ZXh0Q29udGVudCA9ICcrJztcbiAgICBidG5zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2J0bnMtY29udGFpbmVyJyk7XG4gICAgYnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzaG93RnVsbEJ0bik7XG4gICAgYnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZChmaW5pc2hlZEJ1dG9uKTtcbiAgICBidG5zQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgdG9kb0VsLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0b2RvRWwuYXBwZW5kQ2hpbGQoYnRuc0NvbnRhaW5lcik7XG4gICAgbGkuYXBwZW5kQ2hpbGQodG9kb0VsKTtcblxuICAgIHRvZG9GdWxsLmNsYXNzTGlzdC5hZGQoJ3RvZG8tZnVsbCcpO1xuICAgIHRvZG9GdWxsLmNsYXNzTGlzdC5hZGQoYGhpZGRlbmApO1xuICAgIHRvZG9GdWxsLmNsYXNzTGlzdC5hZGQoYCR7dG9kby5pc0ZpbmlzaGVkID8gJ2ZpbmlzaGVkJyA6ICdub3BlJ31gKTtcbiAgICB0b2RvRnVsbC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYWZ0ZXJiZWdpbicsXG4gICAgICBgXG4gICAgXG4gICAgPHA+XG4gICAgICBEZXNjcmlwdGlvbjogJHt0b2RvLmRlc2NyaXB0aW9ufVxuICAgIDwvcD5cbiAgICA8cD5EYXRlOiAke3RvZG8uZGF0ZX08L3A+YFxuICAgICk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodG9kb0Z1bGwpO1xuICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGAke3RvZG8uaWR9YCk7XG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICB9O1xuXG4gIHJlbmRlckZvcm0oKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZm9ybS1jb250YWluZXInKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25ldy1mb3JtLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgZm9ybUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm1FbC5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsICdzdWJtaXQnKTtcbiAgICBmb3JtRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9ybU1hcmtkb3duKTtcbiAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1FbCk7XG4gICAgY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIGZvcm1Db250YWluZXIpO1xuXG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtZm9ybScpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvcm1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclByb2plY3RQcmV2aWV3KHByb2plY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgIGNvbnN0IHByb2plY3RQcmV2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdFByZXZpZXcuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1wcmV2aWV3Jyk7XG5cbiAgICBwcm9qZWN0UHJldmlldy50ZXh0Q29udGVudCA9IGAke3Byb2plY3QubmFtZX1gO1xuICAgIHByb2plY3RFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBgJHtwcm9qZWN0LmlkfWApO1xuXG4gICAgcHJvamVjdEVsLmFwcGVuZENoaWxkKHByb2plY3RQcmV2aWV3KTtcblxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb250YWluZXInKTtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHByb2plY3RFbCk7XG4gIH1cblxuICByZW5kZXJUb0RvUHJldmlldyh0b2RvKSB7XG4gICAgY29uc3QgdG9kb1ByZXZpZXdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9QcmV2aWV3RWwuY2xhc3NMaXN0LmFkZCgndG9kby1wcmV2aWV3Jyk7XG4gICAgdG9kb1ByZXZpZXdFbC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9YDtcbiAgICBpZiAodG9kby5pc0ZpbmlzaGVkKSB0b2RvUHJldmlld0VsLmNsYXNzTGlzdC5hZGQoJ2ZpbmlzaGVkLXByZXZpZXcnKTtcbiAgICB0b2RvUHJldmlld0VsLnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLCBgJHt0b2RvLnBhcmVudElkfWApO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5wcm9qZWN0W2RhdGEtaWQ9JyR7dG9kby5wYXJlbnRJZH0nXWBcbiAgICApO1xuXG4gICAgcHJvamVjdC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHRvZG9QcmV2aWV3RWwpO1xuICB9XG5cbiAgcmVuZGVyQWxsVG9Ebyh0b2Rvcykge1xuICAgIHRoaXMuY2xlYXJUb0RvTGlzdCgpO1xuICAgIHRvZG9zLmZvckVhY2goKHRvZG8pID0+IHRoaXMucmVuZGVyVG9Ebyh0b2RvKSk7XG4gIH1cblxuICBjbGVhclRvRG9MaXN0KCkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zLWxpc3QgdWwnKTtcbiAgICB0b0RvTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIHRvZG9TaG93KHRvZG8pIHtcbiAgICB0b2RvLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICB9XG5cbiAgcmVuZGVyQWxsUHJvamVjdFByZXZpZXcoYmFzZSkge1xuICAgIGJhc2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4gdGhpcy5yZW5kZXJQcm9qZWN0UHJldmlldyhwcm9qZWN0KSk7XG4gIH1cblxuICByZWRuZXJBbGxUb0RvUHJldmlldyhiYXNlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiYXNlLnByb2plY3RzW2ldLnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHRoaXMucmVuZGVyVG9Eb1ByZXZpZXcodG9kbykpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVG9Eb1ByZXZpZXcoKSB7XG4gICAgY29uc3QgdG9Eb1ByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tcHJldmlldycpO1xuICAgIHRvRG9QcmV2aWV3cy5mb3JFYWNoKChwcmV2aWV3KSA9PiBwcmV2aWV3LnJlbW92ZSgpKTtcbiAgfVxuXG4gIHRvZ2dsZUZpbmlzaGVkTWFyayh0b2RvKSB7XG4gICAgdG9kby5xdWVyeVNlbGVjdG9yKCcudGl0bGUtZWxlbWVudCcpLmNsYXNzTGlzdC50b2dnbGUoJ2ZpbmlzaGVkJyk7XG4gICAgdG9kby5xdWVyeVNlbGVjdG9yKCcudG9kby1mdWxsJykuY2xhc3NMaXN0LnRvZ2dsZSgnZmluaXNoZWQnKTtcbiAgfVxuXG4gIGNsZWFyQWxsUHJvamVjdFByZXZpZXcoKSB7XG4gICAgY29uc3QgcHJvamVjdFByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBwcm9qZWN0UHJldmlld3MuZm9yRWFjaCgocHJldmlldykgPT4gcHJldmlldy5yZW1vdmUoKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERPTSgpO1xuIiwiaW1wb3J0IERhdGEgZnJvbSAnLi9EYXRhLmpzJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdC5qcyc7XG5pbXBvcnQgVG9EbyBmcm9tICcuL1RvRG8uanMnO1xuaW1wb3J0IERPTSBmcm9tICcuL0RPTS5qcyc7XG5pbXBvcnQgT2JqZWN0SGVscGVyIGZyb20gJy4vTG9jYWxTdG9yYWdlLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlUmFuZG9tTnVtIH0gZnJvbSAnLi9NYXJrZG93bi5qcyc7XG5cbmNvbnN0IGluaXREZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdCgnUHJvamVjdCBEZWZhdWx0Jyk7XG4gIGNvbnN0IHRvZG8xID0gbmV3IFRvRG8oJ0dvZ29nbycsICdvZGluJywgJ3RvZGF5JywgJ2xvdycpO1xuXG4gIHRvZG8xLnBhcmVudElkID0gMTtcbiAgdG9kbzEuc2V0SWQoMSk7XG4gIHByb2plY3QxLmFkZFRvRG8odG9kbzEpO1xuICBwcm9qZWN0MS5zZXRJZCgxKTtcbiAgYmFzZS5hZGRQcm9qZWN0KHByb2plY3QxKTtcbiAgYmFzZS5hY3RpdmVQcm9qZWN0ID0gYmFzZS5wcm9qZWN0c1swXTtcbn07XG5jb25zdCBpbml0UmVuZGVyID0gKCkgPT4ge1xuICBET00ucmVuZGVyQWxsUHJvamVjdFByZXZpZXcoYmFzZSk7XG4gIERPTS5yZWRuZXJBbGxUb0RvUHJldmlldyhiYXNlKTtcbiAgRE9NLnJlbmRlckFsbFRvRG8oYWN0aXZlUHJvamVjdC50b2Rvcyk7XG59O1xuY29uc3QgaGFuZGxlclN1Ym1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkgfSA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICBuZXcgRm9ybURhdGEodGhpcylcbiAgKTtcbiAgY29uc3QgdG9kbyA9IG5ldyBUb0RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xuICB0b2RvLnNldElkKGdlbmVyYXRlUmFuZG9tTnVtKCkpO1xuICB0b2RvLnNldFBhcmVudElkKGFjdGl2ZVByb2plY3QuaWQpO1xuICBhY3RpdmVQcm9qZWN0LmFkZFRvRG8odG9kbyk7XG4gIERPTS5yZW5kZXJUb0RvKC4uLmFjdGl2ZVByb2plY3QudG9kb3Muc2xpY2UoLTEpKTtcbiAgaGVscGVyLnNhdmVEYXRhKGJhc2UpO1xuICBET00ucmVuZGVyVG9Eb1ByZXZpZXcodG9kbyk7XG59O1xuY29uc3QgaGFuZGxlckRlbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBidG5DbG9zZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuZGVsZXRlJyk7XG4gIGlmICghYnRuQ2xvc2UpIHJldHVybjtcbiAgY29uc3Qgc2VsZWN0ZWRUb0RvID0gYnRuQ2xvc2UuY2xvc2VzdCgnbGknKTtcbiAgYWN0aXZlUHJvamVjdC5yZW1vdmVUb0RvKCtzZWxlY3RlZFRvRG8uZGF0YXNldC5pZCk7XG4gIHNlbGVjdGVkVG9Eby5yZW1vdmUoKTtcbiAgRE9NLmNsZWFyVG9Eb1ByZXZpZXcoKTtcbiAgRE9NLnJlZG5lckFsbFRvRG9QcmV2aWV3KGJhc2UpO1xuICBoZWxwZXIuc2F2ZURhdGEoYmFzZSk7XG59O1xuY29uc3QgaGFuZGxlck5ld1Byb2plY3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gIG5ld1Byb2plY3Quc2V0SWQoZ2VuZXJhdGVSYW5kb21OdW0oKSk7XG4gIGJhc2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gJyc7XG4gIC8vIGlmIChidG5OZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgYnRuTmV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gIERPTS5yZW5kZXJQcm9qZWN0UHJldmlldyhuZXdQcm9qZWN0KTtcbn07XG5jb25zdCBoYW5kbGVyQ2hhbmdlQWN0aXZlUG9yamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBhY3RpdmVQcm9qZWN0U2VsZWN0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5wcm9qZWN0LXByZXZpZXcnKTtcbiAgaWYgKCFhY3RpdmVQcm9qZWN0U2VsZWN0KSByZXR1cm47XG4gIGlmIChhY3RpdmVQcm9qZWN0U2VsZWN0LnRleHRDb250ZW50ID09PSBhY3RpdmVQcm9qZWN0Lm5hbWUpIHJldHVybjtcbiAgYWN0aXZlUHJvamVjdCA9IGJhc2UucHJvamVjdHMuZmluZChcbiAgICAocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0U2VsZWN0LnRleHRDb250ZW50XG4gICk7XG4gIGJhc2UuYWN0aXZlUHJvamVjdCA9IGFjdGl2ZVByb2plY3Q7XG4gIGlmIChidG5OZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgYnRuTmV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBpZiAoIXdhcm5pbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICBET00ucmVuZGVyQWxsVG9EbyhhY3RpdmVQcm9qZWN0LnRvZG9zKTtcbn07XG5jb25zdCBoYW5kbGVyU2hvd0Z1bGxJbmZvID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGNvbnN0IHRvZG9TaG93QnRuID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaG93LWZ1bGwnKTtcbiAgaWYgKCF0b2RvU2hvd0J0bikgcmV0dXJuO1xuICB0b2RvU2hvd0J0bi50ZXh0Q29udGVudCA9IHRvZG9TaG93QnRuLnRleHRDb250ZW50ID09PSAnKycgPyAnLScgOiAnKyc7XG4gIERPTS50b2RvU2hvdyh0b2RvU2hvd0J0bi5jbG9zZXN0KCcudG9kbycpLm5leHRTaWJsaW5nKTtcbn07XG5jb25zdCBoYW5kbGVyTWFya0FzRmluaXNoZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgYnRuTWFya0FzRmluaXNoZWQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmZpbmlzaCcpO1xuICBpZiAoIWJ0bk1hcmtBc0ZpbmlzaGVkKSByZXR1cm47XG4gIGNvbnN0IHRvZG8gPSBidG5NYXJrQXNGaW5pc2hlZC5jbG9zZXN0KCdsaScpO1xuICBhY3RpdmVQcm9qZWN0LmZpbmRUb0RvQnlJRCgrdG9kby5kYXRhc2V0LmlkKS5tYXJrQXNGaW5pc2hlZCgpO1xuICBET00udG9nZ2xlRmluaXNoZWRNYXJrKHRvZG8pO1xuICBET00uY2xlYXJUb0RvUHJldmlldygpO1xuICBET00ucmVkbmVyQWxsVG9Eb1ByZXZpZXcoYmFzZSk7XG4gIGhlbHBlci5zYXZlRGF0YShiYXNlKTtcbn07XG5jb25zdCBoYW5kbGVyRGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgYmFzZS5yZW1vdmVQcm9qZWN0KCk7XG4gIERPTS5jbGVhckFsbFByb2plY3RQcmV2aWV3KCk7XG4gIERPTS5yZW5kZXJBbGxQcm9qZWN0UHJldmlldyhiYXNlKTtcbiAgRE9NLnJlZG5lckFsbFRvRG9QcmV2aWV3KGJhc2UpO1xuICBET00uY2xlYXJUb0RvTGlzdCgpO1xuICBoZWxwZXIuc2F2ZURhdGEoYmFzZSk7XG4gIGJ0bk5ldy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgd2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5jb25zdCBoYW5kbGVyVG9Eb1ByZXZpZXdDaGFnZUFjdGl2ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBjbGlja2VkID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b2RvLXByZXZpZXcnKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG4gIGFjdGl2ZVByb2plY3QgPSBiYXNlLnByb2plY3RzLmZpbmQoXG4gICAgKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09ICtjbGlja2VkLmRhdGFzZXQucGFyZW50XG4gICk7XG4gIGJhc2UuYWN0aXZlUHJvamVjdCA9IGFjdGl2ZVByb2plY3Q7XG4gIGlmIChidG5OZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgYnRuTmV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBpZiAoIXdhcm5pbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgRE9NLnJlbmRlckFsbFRvRG8oYWN0aXZlUHJvamVjdC50b2Rvcyk7XG59O1xuXG5jb25zb2xlLmxvZygnU1RBUlQnKTtcbmxldCBiYXNlID0gbmV3IERhdGEoKTtcblxuY29uc3QgaGVscGVyID0gbmV3IE9iamVjdEhlbHBlcihiYXNlKTtcblxuaW5pdERlZmF1bHRQcm9qZWN0KCk7XG5cbmxldCBhY3RpdmVQcm9qZWN0ID0gYmFzZS5hY3RpdmVQcm9qZWN0O1xuYmFzZSA9XG4gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYXNlJykgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykgIT09ICdbXSdcbiAgICA/IGhlbHBlci5sb2FkRGF0YSgpXG4gICAgOiBiYXNlO1xuXG5hY3RpdmVQcm9qZWN0ID0gYmFzZS5hY3RpdmVQcm9qZWN0O1xuXG5pbml0UmVuZGVyKCk7XG5cbmNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hlY2stcHJvamVjdCcpO1xuY29uc3QgYnRuTmV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10b2RvLWJ0bicpO1xuY29uc3QgZm9ybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XG5jb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJyk7XG5jb25zdCBkZWxldGVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1wcm9qZWN0Jyk7XG5cbi8vRVZFTlQgTElTVEVORVJTXG5cbmJ0bk5ldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgRE9NLnJlbmRlckZvcm0oKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZXJTdWJtaXQpO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyRGVsZXRlKTtcblxuZm9ybU5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlck5ld1Byb2plY3QpO1xuXG5hc2lkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJDaGFuZ2VBY3RpdmVQb3JqZWN0KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJTaG93RnVsbEluZm8pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlck1hcmtBc0ZpbmlzaGVkKTtcblxuZGVsZXRlUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJEZWxldGVQcm9qZWN0KTtcblxuYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyVG9Eb1ByZXZpZXdDaGFnZUFjdGl2ZSk7XG4iLCJpbXBvcnQgRGF0YSBmcm9tICcuL0RhdGEnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUb0RvIGZyb20gJy4vVG9Ebyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKGJhc2UpIHtcbiAgICB0aGlzLmJhc2UgPSBiYXNlO1xuICAgIHRoaXMucHJvamVjdHMgPSBiYXNlLnByb2plY3RzO1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnByb2plY3RzLm1hcCgocHJvamVjdCkgPT4gcHJvamVjdC50b2Rvcyk7XG4gICAgdGhpcy5iYXNlUmVzdWx0O1xuICB9XG5cbiAgZ2V0VG9Eb3ModG9kb3NKU09OKSB7XG4gICAgdGhpcy50b2RvcyA9IHRoaXMucHJvamVjdHMubWFwKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRvZG9zKTtcbiAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKHRvZG9zSlNPTik7XG4gICAgY29uc3QgcmVzdWx0MiA9IEpTT04ucGFyc2UodG9kb3NKU09OKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSByZXN1bHRbaV0ubWFwKFxuICAgICAgICAob2JqKSA9PiBuZXcgVG9EbyhvYmoudGl0bGUsIG9iai5kZXNjcmlwdGlvbiwgb2JqLmRhdGUsIG9iai5wcmlvcml0eSlcbiAgICAgICk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSByZXN1bHRbaV0ubWFwKChvYmosIGluZGV4KSA9PlxuICAgICAgICBPYmplY3QuYXNzaWduKG9iaiwgcmVzdWx0MltpXVtpbmRleF0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0UHJvamVjdHMocHJvamVjdHNKU09OKSB7XG4gICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UocHJvamVjdHNKU09OKTtcbiAgICBjb25zdCByZXN1bHQyID0gcmVzdWx0Lm1hcCgocHJvamVjdCkgPT4gbmV3IFByb2plY3QocHJvamVjdC5uYW1lKSk7XG4gICAgY29uc3QgcmVzdWx0MyA9IHJlc3VsdDIubWFwKChvYmosIGkpID0+IE9iamVjdC5hc3NpZ24ob2JqLCByZXN1bHRbaV0pKTtcbiAgICByZXR1cm4gcmVzdWx0MztcbiAgfVxuXG4gIGdldEJhc2UoYmFzZUpTT04pIHtcbiAgICBjb25zdCBKU09OcmVzdWx0ID0gSlNPTi5wYXJzZShiYXNlSlNPTik7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRhKCk7XG4gICAgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbihyZXN1bHQsIEpTT05yZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzYXZlRGF0YShiYXNlKSB7XG4gICAgLy8gaWYgKCFiYXNlLnByb2plY3RzKSByZXR1cm47XG4gICAgY29uc3QgYmFzZUpTT04gPSBKU09OLnN0cmluZ2lmeShiYXNlKTtcbiAgICBjb25zdCBwcm9qZWN0c0pTT04gPSBKU09OLnN0cmluZ2lmeShiYXNlLnByb2plY3RzKTtcbiAgICBjb25zdCB0b2Rvc0pTT04gPSBKU09OLnN0cmluZ2lmeShcbiAgICAgIGJhc2UucHJvamVjdHMubWFwKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRvZG9zKVxuICAgICk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFzZScsIGJhc2VKU09OKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBwcm9qZWN0c0pTT04pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIHRvZG9zSlNPTik7XG5cbiAgICBjb25zdCBiYXNlUmVzdWx0ID0gdGhpcy5nZXRCYXNlKGJhc2VKU09OKTtcbiAgICBjb25zdCBwcm9qZWN0c1Jlc3VsdCA9IHRoaXMuZ2V0UHJvamVjdHMocHJvamVjdHNKU09OKTtcbiAgICBjb25zdCB0b2Rvc1Jlc3VsdCA9IHRoaXMuZ2V0VG9Eb3ModG9kb3NKU09OKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNSZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHByb2plY3RzUmVzdWx0W2ldLnRvZG9zID0gdG9kb3NSZXN1bHRbaV07XG4gICAgfVxuXG4gICAgYmFzZVJlc3VsdC5wcm9qZWN0cyA9IHByb2plY3RzUmVzdWx0O1xuXG4gICAgYmFzZVJlc3VsdC5hY3RpdmVQcm9qZWN0ID0gYmFzZVJlc3VsdC5wcm9qZWN0c1swXTtcblxuICAgIHJldHVybiBiYXNlUmVzdWx0O1xuICB9XG5cbiAgbG9hZERhdGEoKSB7XG4gICAgY29uc3QgYmFzZVJlc3VsdCA9IHRoaXMuZ2V0QmFzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFzZScpKTtcbiAgICBjb25zdCBwcm9qZWN0c1Jlc3VsdCA9IHRoaXMuZ2V0UHJvamVjdHMobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGNvbnN0IHRvZG9zUmVzdWx0ID0gdGhpcy5nZXRUb0Rvcyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9qZWN0c1Jlc3VsdFtpXS50b2RvcyA9IHRvZG9zUmVzdWx0W2ldO1xuICAgIH1cblxuICAgIGJhc2VSZXN1bHQucHJvamVjdHMgPSBwcm9qZWN0c1Jlc3VsdDtcblxuICAgIGJhc2VSZXN1bHQuYWN0aXZlUHJvamVjdCA9IGJhc2VSZXN1bHQucHJvamVjdHNbMF07XG4gICAgcmV0dXJuIGJhc2VSZXN1bHQ7XG4gIH1cbn1cblxuLy/QodC90LDRh9Cw0LvQsCDRgdC+0LfQtNCw0LXQvCDQuNC90YHRgtCw0L3RgSDQutC70LDRgdGB0LAg0YHQviDRgdCy0L7QudGB0YLQstCw0LzQuCDQuNC3IEpTT04gPT5cbi8v0J7RgdGC0LDQu9GM0L3QvtC1INCy0L7RgdGB0YLQsNC90LDQstC70LjQstCw0LXQvCDRh9C10YDQtdC3IE9iamVjdC5hc3NpZ25cbiJdLCJuYW1lcyI6WyJEYXRhIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwicHJvamVjdHMiLCJhY3RpdmVQcm9qZWN0IiwiYWRkUHJvamVjdCIsInByb2plY3QiLCJwdXNoIiwicmVtb3ZlUHJvamVjdCIsImNvbnNvbGUiLCJsb2ciLCJzZWxlY3RlZCIsImZpbmRJbmRleCIsIm5hbWUiLCJzcGxpY2UiLCJQcm9qZWN0IiwidG9kb3MiLCJpZCIsImFkZFRvRG8iLCJ0b2RvIiwicmVtb3ZlVG9EbyIsImVsZW1lbnQiLCJzZXRJZCIsImZpbmRUb0RvQnlJRCIsInRvZG9JZCIsIlRvRG8iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsInByaW9yaXR5IiwiaXNGaW5pc2hlZCIsInBhcmVudElkIiwibWFya0FzRmluaXNoZWQiLCJzZXRQYXJlbnRJZCIsImdlbmVyYXRlUmFuZG9tTnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVuZGVyVG9EbyIsInVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGkiLCJjcmVhdGVFbGVtZW50IiwidG9kb0VsIiwidG9kb0Z1bGwiLCJidG5zQ29udGFpbmVyIiwiZGVsZXRlQnRuIiwiZmluaXNoZWRCdXRvbiIsInNob3dGdWxsQnRuIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImluc2VydEFkamFjZW50SFRNTCIsInNldEF0dHJpYnV0ZSIsInJlbmRlckZvcm0iLCJjb250YWluZXIiLCJmb3JtQ29udGFpbmVyIiwiZm9ybUVsIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsInJlbmRlclByb2plY3RQcmV2aWV3IiwicHJvamVjdEVsIiwicHJvamVjdFByZXZpZXciLCJyZW5kZXJUb0RvUHJldmlldyIsInRvZG9QcmV2aWV3RWwiLCJyZW5kZXJBbGxUb0RvIiwiY2xlYXJUb0RvTGlzdCIsImZvckVhY2giLCJpbm5lckhUTUwiLCJ0b2RvU2hvdyIsInRvZ2dsZSIsInJlbmRlckFsbFByb2plY3RQcmV2aWV3IiwiYmFzZSIsInJlZG5lckFsbFRvRG9QcmV2aWV3IiwiaSIsImxlbmd0aCIsImNsZWFyVG9Eb1ByZXZpZXciLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJldmlldyIsInRvZ2dsZUZpbmlzaGVkTWFyayIsImNsZWFyQWxsUHJvamVjdFByZXZpZXciLCJoYW5kbGVyU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwiRm9ybURhdGEiLCJzbGljZSIsImhlbHBlciIsInNhdmVEYXRhIiwibWFwIiwiYmFzZVJlc3VsdCIsImdldFRvRG9zIiwidG9kb3NKU09OIiwicmVzdWx0IiwiSlNPTiIsInBhcnNlIiwicmVzdWx0MiIsIm9iaiIsImluZGV4IiwiYXNzaWduIiwiZ2V0UHJvamVjdHMiLCJwcm9qZWN0c0pTT04iLCJnZXRCYXNlIiwiYmFzZUpTT04iLCJKU09OcmVzdWx0Iiwic3RyaW5naWZ5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInByb2plY3RzUmVzdWx0IiwidG9kb3NSZXN1bHQiLCJsb2FkRGF0YSIsImdldEl0ZW0iLCJwcm9qZWN0MSIsInRvZG8xIiwiaW5pdERlZmF1bHRQcm9qZWN0Iiwid2FybmluZyIsImJ0bk5ldyIsImZvcm1OZXdQcm9qZWN0IiwiYXNpZGUiLCJkZWxldGVQcm9qZWN0IiwiYnRuQ2xvc2UiLCJ0YXJnZXQiLCJjbG9zZXN0Iiwic2VsZWN0ZWRUb0RvIiwiZGF0YXNldCIsInByb2plY3ROYW1lIiwidmFsdWUiLCJuZXdQcm9qZWN0IiwiYWN0aXZlUHJvamVjdFNlbGVjdCIsImZpbmQiLCJjb250YWlucyIsInRvZG9TaG93QnRuIiwibmV4dFNpYmxpbmciLCJidG5NYXJrQXNGaW5pc2hlZCIsImNsaWNrZWQiLCJwYXJlbnQiXSwic291cmNlUm9vdCI6IiJ9
