var questionnaireContainer = document.querySelector('.questionnaire-container');

var addQuestionnaireForm = document.querySelector('.add-questionnaire-form');
var questionnaireFormInput = document.querySelector('.questionnaire-form-input');
var questionnaireFormInputList = questionnaireFormInput.querySelectorAll('input');
var showFormButton = document.querySelector('.show-form-button');
var closeFormButtom = document.querySelector('.close-from-button');

var questionnaireItemTemplate = document.querySelector('#questionnaire-item-template').content;
var questionnaireContainerEmpty = document.querySelector('.questionnaire-container-empty');
var questionnaireItem = questionnaireItemTemplate.querySelector('.questionnaire-item');

showFormButton.addEventListener('click', function () {
    addQuestionnaireForm.style.display = 'flex';
    document.querySelector('.modal').style.display ='block';
});

closeFormButtom.addEventListener('click', function () {
    addQuestionnaireForm.style.display = 'none';
    document.querySelector('.modal').style.display ='none';
    for (let i = 0; i < questionnaireFormInputList.length; i++) {
        questionnaireFormInputList[i].value = '';
    }
});



addQuestionnaireForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var newQuestionnaireItem = questionnaireItem.cloneNode(true);
    var questionnaireItemList = newQuestionnaireItem.children;
    for (let i = 1; i < questionnaireItemList.length; i++) {
        questionnaireItemList[i].textContent += questionnaireFormInputList[i-1].value;
    }
    questionnaireContainer.appendChild(newQuestionnaireItem);
    questionnaireItemList[1].textContent = 'АНКЕТА № ' + questionnaireContainer.children.length;
    for (let i = 0; i < questionnaireFormInputList.length; i++) {
        questionnaireFormInputList[i].value = '';
    }
    addQuestionnaireForm.style.display = 'none';
    document.querySelector('.modal').style.display ='none';
    if  (questionnaireContainer.children.length >0){
        questionnaireContainerEmpty.style.display = 'none';
        questionnaireContainer.style.display = 'flex';
    }
    else{
        questionnaireContainer.style.display = 'none';
        questionnaireContainerEmpty.style.display = 'block';
    }
})

