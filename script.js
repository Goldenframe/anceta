const questionnaireContainer = document.querySelector(".questionnaire-container");

const addQuestionnaireForm = document.querySelector(".add-questionnaire-form");
const questionnaireForm = document.querySelector("#questionnaire-form");

const questionnaireFormInput = document.querySelector(".questionnaire-form-input");
let questionnaireFormInputList = questionnaireFormInput.querySelectorAll("input");

const showFormButton = document.querySelector(".show-form-button");
const closeFormButtom = document.querySelector("#close-form-button");
const addQuestionButton = document.querySelector("#add-question-button");

const questionnaireContainerEmpty = document.querySelector(".questionnaire-container-empty");
const questionnaireItemArray = [];

const originalForm = ` <label for="name-id">
            ТВОЁ ИМЯ
            <input
              type="text"
              id="name-id"
              name="name"
              data-text="ТВОЁ ИМЯ"
              maxlength="20"
              required
            />
          </label>
          <label for="zodiac-sign-id">
            ТВОЯ ФАМИЛИЯ
            <input
              type="text"
              id="last-name-id"
              name="last-name"
              data-text="ТВОЯ ФАМИЛИЯ"
              maxlength="20"
              required
            />
          </label>
          <label for="birthday-id">
            ДЕНЬ РОЖДЕНИЯ
            <input
              type="date"
              id="birthday-id"
              name="birthday"
              data-text="ДЕНЬ РОЖДЕНИЯ"
              maxlength="20"
              required
            />
          </label>`;

showFormButton.addEventListener("click", () => {
    addQuestionnaireForm.style.display = "flex";
    document.querySelector(".modal").style.display = "block";
});

closeFormButtom.addEventListener("click", closeForm);

let randomQuestionsArray = [
    { questionText: "ЛЮБИМОЕ ВРЕМЯ ГОДА", inputID: "fav-season-id", inputName: "fav-season-name" },
    { questionText: "ЛЮБИМЫЙ ЦВЕТ", inputID: "fav-color-id", inputName: "fav-color-name" },
    { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
];

function closeForm() {
    addQuestionnaireForm.style.display = "none";
    document.querySelector(".modal").style.display = "none";
    for (let i = 0; i < questionnaireFormInputList.length; i++) {
        questionnaireFormInputList[i].value = "";
    }
    questionnaireFormInput.innerHTML = originalForm;
    randomQuestionsArray = [
        { questionText: "ЛЮБИМОЕ ВРЕМЯ ГОДА", inputID: "fav-season-id", inputName: "fav-season-name" },
        { questionText: "ЛЮБИМЫЙ ЦВЕТ", inputID: "fav-color-id", inputName: "fav-color-name" },
        { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
    ];
    shuffle(randomQuestionsArray);
}
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

addQuestionButton.addEventListener("click", () => {
    shuffle(randomQuestionsArray);
    if (randomQuestionsArray.length !== 0) {
        const randomQuestion = randomQuestionsArray.shift();
        const newQuestion = document.createElement("label");
        newQuestion.setAttribute("for", randomQuestion.inputID);
        newQuestion.innerHTML =
            `${randomQuestion.questionText}
            <input
                type="text"
                id="${randomQuestion.inputID}"
                name="${randomQuestion.inputName}"
                data-text="${randomQuestion.questionText}"
                maxlength="20"
                required
            />`;

        questionnaireFormInput.appendChild(newQuestion);
    } else {
        alert("Все вопросы закончились!");
    }
})

let questionnaireCount = 1;

addQuestionnaireForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("data")) || []
    questionnaireFormInputList = questionnaireFormInput.querySelectorAll("input");
    const newQuestionnaireData = {};
    questionnaireFormInputList.forEach((input) => {
        newQuestionnaireData.id = "questionnaire-item" + data.length;
        newQuestionnaireData[input.name] = { inputText: input.getAttribute("data-text"), inputValue: input.value };
    }
    );
    data.push(newQuestionnaireData);
    localStorage.setItem("data", JSON.stringify(data));
    const questionnaireItem = document.createElement("div");
    questionnaireItem.setAttribute("class", "questionnaire-item");
    questionnaireItem.setAttribute("id", "questionnaire-item" + data.length);
    questionnaireItem.innerHTML = `<span class="questionnaire-number">АНКЕТА №${questionnaireCount++} </span>`;

    for (let key in newQuestionnaireData) {
        if (key !== "id") {
            questionnaireItem.innerHTML += `
          <span>${newQuestionnaireData[key].inputText}: ${newQuestionnaireData[key].inputValue}</span>`
        }
    }
    questionnaireItem.innerHTML += '<button type="button" class="close-button" onclick="deleteQuestionnaireItem(this)">Х</button>';

    questionnaireContainer.appendChild(questionnaireItem);
    if (questionnaireContainer.children.length > 0) {
        questionnaireContainerEmpty.style.display = "none";
        questionnaireContainer.style.display = "flex";
    }
    else {
        questionnaireContainer.style.display = "none";
        questionnaireContainerEmpty.style.display = "block";
    }
    closeForm();
})

const deleteQuestionnaireItem = (item) => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    const questionnaireItemId = data.findIndex((dataItem) => dataItem.id === item.parentElement.id);
    data.splice(questionnaireItemId, 1);
    localStorage.setItem("data", JSON.stringify(data));
    item.parentElement.remove();
    if (data.length === 0){
        questionnaireContainer.style.display = "none";
        questionnaireContainerEmpty.style.display = "block";
    }
        window.location.reload();

}