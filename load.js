window.addEventListener("load", () => {
    const loadData = JSON.parse(localStorage.getItem("data"));
    if (loadData && loadData.length > 0) {
        loadData.forEach(item => {
            const questionnaireItem = document.createElement("div");
            questionnaireItem.setAttribute("id", item.id);

            questionnaireItem.setAttribute("class", "main__questionnaire-item");
            questionnaireItem.innerHTML = `<div class="main__questionnaire-item__header">
            <span class="main__questionnaire-item__number">АНКЕТА №${item.id.substring(9)} </span>
            <button type="button" class="close-button" onclick="deleteQuestionnaireItem(this)">Х</button>
            </div>`;
            const questionnaireItemContent = document.createElement("div");
            questionnaireItemContent.setAttribute("class", "main__questionnaire-item__content");
            for (let key in item) {
                if (key !== "id") {
                    questionnaireItemContent.innerHTML += `
          <p><span class="main__questionnaire-item__point">${item[key].inputText}:</span> ${item[key].inputValue}</p>`
                }
            }
            questionnaireItem.appendChild(questionnaireItemContent);
            questionnaireContainer.appendChild(questionnaireItem);
            if (questionnaireContainer.children.length > 0) {
                questionnaireContainerEmpty.style.display = "none";
                questionnaireTitle.style.display = "flex";
                questionnaireContainer.style.display = "flex";
            }
        });
    }
    else {
        questionnaireContainerEmpty.style.display = "block";
        questionnaireTitle.style.display = "none";
        questionnaireContainer.style.display = "none";
    }
})

