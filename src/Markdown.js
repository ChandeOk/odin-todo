const formMarkdown = `<div class="field">
<label for="title">Title: </label>
<input type="text" name="title" id="title" required/>
</div>
<div class="field">
<label for="description">Description: </label>
<input type="text" name="description" id="description" required/>
</div>
<div class="field">
<label for="date">Date: </label>
<input type="date" name="date" id="date" required/>
</div>
<div class="radio-btn">
<label for="low-prio">Low</label>
<input type="radio" name="priority" id="low-prio" value="low" />
<label for="med-prio">Medium</label>
<input type="radio" name="priority" id="med-prio" value="med" />
<label for="high-prio">High</label>
<input type="radio" name="priority" id="high-prio" value="high" checked/>
</div>
<button type="submit">Submit</button>
<div class="close-form"><div class="x">X</div></div>
`;

const generateRandomNum = () => {
  return Math.floor(Math.random() * (999999999999999 - 1) + 1);
};

export { formMarkdown, generateRandomNum };
