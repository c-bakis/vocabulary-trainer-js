
// switch between pages
const listPage = document.getElementById('list');
const trainingPage = document.getElementById('training');
const mainPage = document.getElementById('main');
const backBtn = document.querySelectorAll('.to-main-page');
const listPageBtn = document.getElementById('to-list-page');
const queryBtnGer = document.getElementById('start-training-ger');
const queryBtnEng = document.getElementById('start-training-eng');

queryBtnGer.addEventListener('click', () => {
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  mapEnglishGerman();
  nextBtnEng.classList.add('hide');
  nextBtnGer.classList.remove('hide');
});
queryBtnEng.addEventListener('click', () => {
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  mapEnglishGerman();
  nextBtnGer.classList.add('hide');
  nextBtnEng.classList.remove('hide');
});
listPageBtn.addEventListener('click', () => {
  listPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  updateItemList();
});
for (let i = 0; i < backBtn.length; i++) {
  console.log(backBtn[i]);
  backBtn[i].addEventListener('click', () => {
  mainPage.classList.remove('hide');
  trainingPage.classList.add('hide');
  listPage.classList.add('hide');
});
}

// listpage
const answer = document.getElementById('answer');
const german = document.querySelector("#german");
const english = document.querySelector("#english");
const addItemBtn = document.getElementById('addItemBtn');
const vocabList = document.getElementById("vocabularyList");
let dictionary =  JSON.parse(localStorage.getItem('dictionary') || []);
let item = {};

// adds new Items to dictionary and local storage and calls updateItemList function
const addVocabulary = () => {  
  if (german.value == '' || english.value == '') {
    return
  }
  let item = {
        'german': german.value,
        'english': english.value,
        'id':  new Date().getTime()
    }
    dictionary.push(item);
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
      
      updateItemList(item);

  german.value = '';
  english.value = '';
} 

//updates List of Vokabulary Items on display
const updateItemList = () => {
    vocabList.innerHTML = '';
    if (localStorage.getItem('dictionary') !== null || undefined) {
    Object.values(dictionary).forEach(item =>{
      vocabList.innerHTML += `<li id="${item.id}"><span class="list-item">${item.german} - ${item.english}</span><button class="button-klein delete" onclick="deleteVocab(this)">x</button></li>`;
    
    });
    } else {
      return
    } 
} 

//onclick find index of parent element, deletes item by index from dictionary and local storage, updates ItemList
const deleteVocab = (element) => {
  let dictionaryId = dictionary.map(dictionary => dictionary.id);
  let index = dictionaryId.findIndex(id => id == element.parentNode.id);

    dictionary.splice(index, 1);
    updateItemList();
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
        console.log(dictionary);
};

// training page
const checkBtnGer = document.getElementById('checkBtnGer');
const nextBtnGer = document.getElementById('nextBtnGer');
const checkBtnEng = document.getElementById('checkBtnEng');
const nextBtnEng = document.getElementById('nextBtnEng');
const checkAnswerCorrect = document.getElementById('checkAnswer');
const showAnswer = document.getElementById('showAnswer');
const progress = document.getElementById('progress');

let word = document.getElementById("word");
let mapGerman;
let mapEnglish;
let wrongAnsweredVocab = [];
let indexGerman;
let indexEnglish;
let countRightAnswers = 0;
let countProgress = 0;

// english or german query


function mapEnglishGerman() {
  mapGerman = dictionary.map(dictionary => dictionary.german);
  mapEnglish = dictionary.map(dictionary => dictionary.english);
}

// onclick next button
function nextVocabularyGer() {
  clear()
  currentProgress(dictionary); 
  generateRandomWord(mapGerman);
  changeBtnGer();
  defaultCheckAnswer();
  checkFinish(mapEnglish);
}  

function nextVocabularyEng() {
  clear()
  currentProgress(dictionary); 
  generateRandomWord(mapEnglish);
  changeBtnEng();
  defaultCheckAnswer();
  checkFinish(mapGerman);
}  

function checkFinish(map) {
  if (map.length === 0) {
    finish(map);
  } 
}

function clear () {
  answer.value = '';
  checkAnswerCorrect.innerHTML = '';
  showAnswer.innerHTML = '';
}

function currentProgress(map) {
  countProgress ++;
  let total = map.length;
  progress.innerHTML = `${countProgress}/${total}`;
  progress.classList.add('progress');
  if (countProgress === map.length) {
    nextBtnGer.textContent = 'finish';
    nextBtnEng.textContent = 'finish';
  } else {
    nextBtnGer.textContent = 'next';
    nextBtnEng.textContent = 'next';
  }
}

function generateRandomWord(item) {
  let randomNum = Math.floor(Math.random() *item.length);
  word.innerHTML = `${item[randomNum]}?`;
  let randomWord = item[randomNum];
  findRandWordIndex(randomWord, randomNum);
}

function findRandWordIndex (randomWord, randomNum) {
  if (randomWord === mapGerman[randomNum]){
  indexGerman = mapGerman.findIndex(german => german === randomWord);  
  return indexGerman;
} else if (randomWord === mapEnglish[randomNum]) {
  indexEnglish = mapEnglish.findIndex(english => english === randomWord);
  return indexEnglish;
}}


//display only one button at a time
function changeBtnGer() {
  checkBtnGer.classList.toggle('hide');
  nextBtnGer.classList.toggle('hide');
}
function changeBtnEng() {
  checkBtnEng.classList.toggle('hide');
  nextBtnEng.classList.toggle('hide');
}
//hiding showAnswer and showing checkAnswerCorrect if class was toggled
function defaultCheckAnswer () {
  checkAnswerCorrect.classList.remove('hide');
  showAnswer.classList.add('hide');
}

/**/
//onclick check button
function checkAnswerGer() {
  indexEnglish = mapEnglish.findIndex(english => english == answer.value);
  answerRight(mapEnglish);
  deleteFromQuery(indexGerman)
  changeBtnGer();
}

function checkAnswerEng() {
  indexGerman = mapGerman.findIndex(german => german == answer.value);
  answerRight(mapGerman);
  deleteFromQuery(indexEnglish)
  changeBtnEng();
}


function answerRight (map) {
  if(indexEnglish === indexGerman && map.length !== 0) {
    checkAnswerCorrect.textContent = 'Right answer!';
    countRightAnswers ++;
} else if (indexEnglish !== indexGerman && map.length !== 0 && indexGerman !== -1) {
  checkAnswerCorrect.innerHTML = `Sorry, that's not the answer <button class="show-answer-button">display answer?</button>`;
  showAnswer.innerHTML = `${map[indexGerman]}`
  console.log(indexGerman);
  wrongAnswers(indexGerman);
} else if (indexEnglish !== indexGerman && map.length !== 0 && indexEnglish !== -1) {
  checkAnswerCorrect.innerHTML = `Sorry, that's not the answer <button class="show-answer-button">display answer?</button>`;
  showAnswer.innerHTML = `${map[indexEnglish]}`
  wrongAnswers(indexEnglish);
} else {
  return
}}


function deleteFromQuery (index) {
mapEnglish.splice(index, 1);
mapGerman.splice(index, 1);
}

function wrongAnswers (index) {
  let english = mapEnglish[index];
  let german = mapGerman[index]
  let obj = {'english': english, 'german': german}
  wrongAnsweredVocab.push(obj);
}

// shows right answer onclick if answer was wrong
checkAnswerCorrect.addEventListener('click', ()  => {
  checkAnswerCorrect.classList.toggle('hide');
  showAnswer.classList.toggle('hide');
});

// show Score, button for new Query and button for only wrong ansered query
function finish() {
  word.textContent = `Your Score:   ${countRightAnswers}/${dictionary.length}`
  progress.textContent = '';
  toggleTrainingPage();
  toggleWronAndNewQueryBtn();
}

// after finishing a query, need reset function?
function startNewQuery() {
  countRightAnswers = 0;
  countProgress = 0;
  word.textContent = '';
  answer.classList.toggle('hide');
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  toggleWronAndNewQueryBtn();
  console.log(mapGerman)
}

// currently: create new page for only asking wrong answered vocabulary
/*function wronVocabAgain() {
  countRightAnswers = 0;
  countProgress = 0;
  mapGerman = wrongAnsweredVocab.map(askedVocab => askedVocab.german);
  mapEnglish = wrongAnsweredVocab.map(askedVocab => askedVocab.english);
  toggleWronAndNewQueryBtn();
  toggleNewQueryBtn();
  console.log(mapGerman);
}

const newQueryGerBtn = document.getElementById('new-training-ger');
newQueryGerBtn.addEventListener('click', () => {
  nextBtnGer.classList.toggle('hide');
  toggleNewQueryBtn();
  toggleTrainingPage();
});

const newQueryEngBtn = document.getElementById('new-training-eng');
newQueryEngBtn.addEventListener('click', () => {
  nextBtnEng.classList.toggle('hide');
  toggleNewQueryBtn();
  toggleTrainingPage();
});

const toggleNewQueryBtn = () => {
  newQueryGerBtn.classList.toggle('hide');
  newQueryEngBtn.classList.toggle('hide');
}*/

function toggleTrainingPage() {
  checkBtnGer.classList.add('hide');
  checkBtnEng.classList.add('hide');
  answer.classList.toggle('hide');
  progress.classList.remove('progress');
}
const toggleWronAndNewQueryBtn = () => {
  const wrongAgainBtn = document.getElementById('wrongAgain');
  const newQueryBtn = document.getElementById('newQuery');
  wrongAgainBtn.classList.toggle('hide');
  newQueryBtn.classList.toggle('hide');
}