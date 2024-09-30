const questionnaireContainer = document.querySelector(".main__questionnaire-container");

const addQuestionnaireForm = document.querySelector(".form");
const questionnaireForm = document.querySelector("#questionnaire-form");

const questionnaireInputContainer = document.querySelector(".form__input-container");
let questionnaireInputContainerList = questionnaireInputContainer.querySelectorAll("input");

const showFormButton = document.querySelector(".header__show-form-button");
const closeFormButtom = document.querySelector("#close-form-button");
const addQuestionButton = document.querySelector("#add-question-button");

const questionnaireContainerEmpty = document.querySelector(".main__questionnaire-empty");
const questionnaireTitle = document.querySelector(".main__questionnaire-title");

const questionnaireItemsArray = [];

const originalForm = `
            <label for="name-id" class="form__label">
              ТВОЁ ИМЯ
              <input
                type="text"
                id="name-id"
                name="name"
                data-text="ТВОЁ ИМЯ"
                maxlength="20"
                required
                class="form__input"
              />
            </label>
            <label for="last-name-id" class="form__label">
              ТВОЯ ФАМИЛИЯ
              <input
                type="text"
                id="last-name-id"
                name="last-name"
                data-text="ТВОЯ ФАМИЛИЯ"
                maxlength="20"
                required
                class="form__input"
              />
            </label>
            <label for="birthday-id" class="form__label">
              ДЕНЬ РОЖДЕНИЯ
              <input
                type="date"
                id="birthday-id"
                name="birthday"
                data-text="ДЕНЬ РОЖДЕНИЯ"
                required
                class="form__input"
              />
            </label>`;

showFormButton.addEventListener("click", () => {
    addQuestionnaireForm.style.display = "flex";
    document.querySelector(".modal").classList.remove("modal--hidden");
});

closeFormButtom.addEventListener("click", closeForm);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeForm();
        console.log('ddd')
    }
});


let randomQuestionsArray = [
    { questionText: "ЛЮБИМОЕ ВРЕМЯ ГОДА", inputID: "fav-season-id", inputName: "fav-season-name" },
    { questionText: "ЛЮБИМЫЙ ЦВЕТ", inputID: "fav-color-id", inputName: "fav-color-name" },
    { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
    { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
    { questionText: "ЛЮБИМЫЙ ФИЛЬМ", inputID: "fav-film-id", inputName: "fav-film-name" },
    { questionText: "ЛЮБИМЫЙ СЕРИАЛ", inputID: "fav-series-id", inputName: "fav-series-name" },
    { questionText: "ЛЮБИМАЯ КНИГА", inputID: "fav-book-id", inputName: "fav-book-name" },
    { questionText: "ЛЮБИМЫЙ ДЕСЕРТ", inputID: "fav-dessert-id", inputName: "fav-dessert-name" },
];

function closeForm() {
    addQuestionnaireForm.style.display = "none";
    document.querySelector(".modal").classList.add("modal--hidden");
    for (let i = 0; i < questionnaireInputContainerList.length; i++) {
        questionnaireInputContainerList[i].value = "";
    }
    questionnaireInputContainer.innerHTML = originalForm;
    randomQuestionsArray = [
        { questionText: "ЛЮБИМОЕ ВРЕМЯ ГОДА", inputID: "fav-season-id", inputName: "fav-season-name" },
        { questionText: "ЛЮБИМЫЙ ЦВЕТ", inputID: "fav-color-id", inputName: "fav-color-name" },
        { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
        { questionText: "ЛЮБИМЫЙ ПИТОМЕЦ", inputID: "fav-pet-id", inputName: "fav-pet-name" },
        { questionText: "ЛЮБИМЫЙ ФИЛЬМ", inputID: "fav-film-id", inputName: "fav-film-name" },
        { questionText: "ЛЮБИМЫЙ СЕРИАЛ", inputID: "fav-series-id", inputName: "fav-series-name" },
        { questionText: "ЛЮБИМАЯ КНИГА", inputID: "fav-book-id", inputName: "fav-book-name" },
        { questionText: "ЛЮБИМЫЙ ДЕСЕРТ", inputID: "fav-dessert-id", inputName: "fav-dessert-name" },
    ];
    addQuestionButton.style.display = "block";
    shuffle(randomQuestionsArray);
}
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

addQuestionButton.addEventListener("click", () => {
    shuffle(randomQuestionsArray);
    if (randomQuestionsArray.length > 1) {
        const randomQuestion = randomQuestionsArray.shift();
        const newQuestion = document.createElement("label");
        newQuestion.setAttribute("for", randomQuestion.inputID);
        newQuestion.classList.add("form__label")
        newQuestion.innerHTML =
            `${randomQuestion.questionText}
            <input
                type="text"
                id="${randomQuestion.inputID}"
                name="${randomQuestion.inputName}"
                data-text="${randomQuestion.questionText}"
                maxlength="20"
                required
                class="form__input"
            />`;

        questionnaireInputContainer.appendChild(newQuestion);
    } else {
        const randomQuestion = randomQuestionsArray[0];
        const newQuestion = document.createElement("label");
        newQuestion.setAttribute("for", randomQuestion.inputID);
        newQuestion.classList.add("form__label")
        newQuestion.innerHTML =
            `${randomQuestion.questionText}
            <input
                type="text"
                id="${randomQuestion.inputID}"
                name="${randomQuestion.inputName}"
                data-text="${randomQuestion.questionText}"
                maxlength="20"
                required
                class="form__input"
            />`;

        questionnaireInputContainer.appendChild(newQuestion);
        addQuestionButton.style.display = "none";
    }
})


addQuestionnaireForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("data")) || []
    questionnaireInputContainerList = questionnaireInputContainer.querySelectorAll("input");
    const newQuestionnaireData = {};
    const uniqueId = (Date.now()).toString();
    questionnaireInputContainerList.forEach((input) => {
        newQuestionnaireData.id = uniqueId;
        newQuestionnaireData[input.name] = { inputText: input.getAttribute("data-text"), inputValue: input.value };
    }
    );
    console.log(newQuestionnaireData)
    data.push(newQuestionnaireData);
    localStorage.setItem("data", JSON.stringify(data));
    const questionnaireItem = document.createElement("div");
    questionnaireItem.setAttribute("class", "main__questionnaire-item");
    questionnaireItem.setAttribute("id", uniqueId);
    questionnaireItem.innerHTML = `<div class="main__questionnaire-item__header">
    <span class="main__questionnaire-item__number">АНКЕТА №${(uniqueId).substring(9)} </span>
    <button type="button" class="close-button" onclick="deleteQuestionnaireItem(this)">Х</button>
    </div>`;
    const questionnaireItemContent = document.createElement("div");
    questionnaireItemContent.setAttribute("class", "main__questionnaire-item__content");
    for (let key in newQuestionnaireData) {
        if (key !== "id") {
            questionnaireItemContent.innerHTML += `
          <p><span class="main__questionnaire-item__point">${newQuestionnaireData[key].inputText}:</span> ${newQuestionnaireData[key].inputValue}</p>`
        }
    }
    questionnaireItem.appendChild(questionnaireItemContent);
    questionnaireContainer.appendChild(questionnaireItem);
    if (questionnaireContainer.children.length > 0) {
        questionnaireContainerEmpty.style.display = "none";
        questionnaireContainer.style.display = "flex";
        questionnaireTitle.style.display = "flex";

    }
    else {
        questionnaireTitle.style.display = "none";
        questionnaireContainer.style.display = "none";
        questionnaireContainerEmpty.style.display = "block";
    }
    closeForm();
})

const deleteQuestionnaireItem = (item) => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    const itemMainParent = item.parentElement.parentElement;
    data = data.filter(dataItem => dataItem.id != itemMainParent.id);
    localStorage.setItem("data", JSON.stringify(data));
    itemMainParent.remove();
    if (data.length === 0) {
        questionnaireTitle.style.display = "none";
        questionnaireContainer.style.display = "none";
        questionnaireContainerEmpty.style.display = "block";
    }
}