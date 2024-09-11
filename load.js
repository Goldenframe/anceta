window.addEventListener("load", () => {
    const loadData = JSON.parse(localStorage.getItem("data"));
    if (loadData && loadData.length > 0) {
        loadData.forEach(item => {
            const questionnaireItem = document.createElement("div");
            questionnaireItem.setAttribute("class", "questionnaire-item");
            questionnaireItem.innerHTML = `<span class="questionnaire-number">АНКЕТА №${questionnaireCount++} </span>`;

            for (let key in item) {
                if (key !== "id") {
                    questionnaireItem.innerHTML += `
                  <span>${item[key].inputText}: ${item[key].inputValue}</span>`
                }
            }
            questionnaireItem.innerHTML += '<button type="button" class="close-button" onclick="deleteQuestionnaireItem(this)">Х</button>';

            questionnaireContainer.appendChild(questionnaireItem);
            if (questionnaireContainer.children.length > 0) {
                questionnaireContainerEmpty.style.display = "none";
                questionnaireContainer.style.display = "flex";
            }
        });
    }
    else {
        questionnaireContainer.style.display = "none";
        questionnaireContainerEmpty.style.display = "block";
    }
})

