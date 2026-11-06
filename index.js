const storageKey = "data";

const questions = [
  ["season", "ЛЮБИМОЕ ВРЕМЯ ГОДА"],
  ["color", "ЛЮБИМЫЙ ЦВЕТ"],
  ["pet", "ЛЮБИМЫЙ ПИТОМЕЦ"],
  ["film", "ЛЮБИМЫЙ ФИЛЬМ"],
  ["series", "ЛЮБИМЫЙ СЕРИАЛ"],
  ["book", "ЛЮБИМАЯ КНИГА"],
  ["dessert", "ЛЮБИМЫЙ ДЕСЕРТ"],
  ["drink", "ЛЮБИМЫЙ НАПИТОК"],
];

const modal = document.querySelector(".modal");
const formPanel = document.querySelector(".form");
const form = document.querySelector(".form__content");
const fields = document.querySelector(".form__input-container");
const openButton = document.querySelector(".header__show-form-button");
const closeButton = document.querySelector("#close-form-button");
const addQuestionButton = document.querySelector("#add-question-button");

const container = document.querySelector(".main__questionnaire-container");
const emptyState = document.querySelector(".main__questionnaire-empty");
const title = document.querySelector(".main__questionnaire-title");

let availableQuestions = [...questions];
let questionnaires = readQuestionnaires();

function readQuestionnaires() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveQuestionnaires(next) {
  localStorage.setItem(storageKey, JSON.stringify(next));
  questionnaires = next;
  renderQuestionnaires();
}

function closeForm() {
  formPanel.style.display = "none";
  modal.classList.add("modal--hidden");
  form.reset();
  fields.querySelectorAll("[data-extra-question]").forEach((label) => label.remove());
  availableQuestions = [...questions];
  addQuestionButton.style.display = "block";
}

function addQuestion() {
  if (availableQuestions.length === 0) return;

  const index = Math.floor(Math.random() * availableQuestions.length);
  const [[name, text]] = availableQuestions.splice(index, 1);
  const label = document.createElement("label");
  label.className = "form__label";
  label.dataset.extraQuestion = "";
  label.textContent = text;

  const input = document.createElement("input");
  input.type = "text";
  input.name = "fav-" + name + "-name";
  input.dataset.text = text;
  input.maxLength = 20;
  input.required = true;
  input.className = "form__input";
  label.append(input);
  fields.append(label);

  if (availableQuestions.length === 0) {
    addQuestionButton.style.display = "none";
  }
}

function createCard(questionnaire) {
  const card = document.createElement("div");
  card.className = "main__questionnaire-item";

  const header = document.createElement("div");
  header.className = "main__questionnaire-item__header";

  const number = document.createElement("span");
  number.className = "main__questionnaire-item__number";
  number.textContent = "АНКЕТА №" + questionnaire.id.slice(-4);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "close-button";
  removeButton.setAttribute("aria-label", "Удалить анкету");
  removeButton.textContent = "Х";
  removeButton.addEventListener("click", () => {
    saveQuestionnaires(questionnaires.filter((item) => item.id !== questionnaire.id));
  });
  header.append(number, removeButton);

  const content = document.createElement("div");
  content.className = "main__questionnaire-item__content";

  for (const [key, answer] of Object.entries(questionnaire)) {
    if (key === "id") continue;

    const line = document.createElement("p");
    const question = document.createElement("span");
    question.className = "main__questionnaire-item__point";
    question.textContent = answer.inputText + ":";
    line.append(question, " " + answer.inputValue);
    content.append(line);
  }

  card.append(header, content);
  return card;
}

function renderQuestionnaires() {
  container.replaceChildren(...questionnaires.map(createCard));
  const hasQuestionnaires = questionnaires.length > 0;

  container.style.display = hasQuestionnaires ? "flex" : "none";
  title.style.display = hasQuestionnaires ? "flex" : "none";
  emptyState.style.display = hasQuestionnaires ? "none" : "block";
}

openButton.addEventListener("click", () => {
  formPanel.style.display = "flex";
  modal.classList.remove("modal--hidden");
});

closeButton.addEventListener("click", closeForm);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeForm();
});
addQuestionButton.addEventListener("click", addQuestion);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let id = Date.now();
  while (questionnaires.some((item) => item.id === String(id))) id++;

  const questionnaire = { id: String(id) };
  for (const input of fields.querySelectorAll("input")) {
    questionnaire[input.name] = {
      inputText: input.dataset.text,
      inputValue: input.value,
    };
  }

  saveQuestionnaires([...questionnaires, questionnaire]);
  closeForm();
});

renderQuestionnaires();
