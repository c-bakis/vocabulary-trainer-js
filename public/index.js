
// switch between pages
const listPage = document.getElementById('list');
const trainingPage = document.getElementById('training');
const mainPage = document.getElementById('main');
const backBtn = document.querySelectorAll('.to-main-page');
const listPageBtn = document.getElementById('to-list-page');
const queryBtnGer = document.getElementById('start-training-ger');
const queryBtnEng = document.getElementById('start-training-eng');
const currentQueryBtn = document.getElementById('current-query');
const currentQuery = document.getElementById('currentQuery');
let language;
let total = 0;

queryBtnGer.addEventListener('click', () => {
  reset();
  totalOfProgress();
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  mapEnglishGerman();
  nextBtnEng.classList.add('hide');
  nextBtnGer.classList.remove('hide');
  language = 'german';
  console.log(language);

});
queryBtnEng.addEventListener('click', () => {
  reset();
  totalOfProgress();
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  mapEnglishGerman();
  nextBtnGer.classList.add('hide');
  nextBtnEng.classList.remove('hide');
  language = 'english';
});
listPageBtn.addEventListener('click', () => {
  listPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  updateItemList();
});
for (let i = 0; i < backBtn.length; i++) {
  backBtn[i].addEventListener('click', () => {
  mainPage.classList.remove('hide');
  trainingPage.classList.add('hide');
  listPage.classList.add('hide');
  if (total !== 0){
    currentQuery.classList.remove('hide');
  }
});
}
currentQueryBtn.addEventListener('click', () => {
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
});

// listpage:
const answer = document.getElementById('answer');
const german = document.querySelector("#german");
const english = document.querySelector("#english");
const addItemBtn = document.getElementById('addItemBtn');
const vocabList = document.getElementById("vocabularyList");
let item = {};
let dictionary = [];
if (dictionary.length !== 0){
  dictionary =  JSON.parse(localStorage.getItem('dictionary') || []);
} else {
  dictionary = [];
}
/**/
// adds new Items to dictionary and local storage and calls updateItemList function
const addVocabulary = () => {  
  if (german.value == '' || english.value == '') {
    return
  }
  let item = {
        'german': german.value,
        'english': english.value,
        'id':  new Date().getTime()
    };
    
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
};

// training page:
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
  currentProgress(); 
  generateRandomWord(mapGerman);
  changeBtnGer();
  defaultCheckAnswer();
  checkFinish(mapEnglish);
}  

function nextVocabularyEng() {
  clear()
  currentProgress(); 
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

function currentProgress() {
  countProgress ++;
  progress.innerHTML = `${countProgress}/${total}`;
  progress.classList.add('progress');
  if (countProgress === total) {
    nextBtnGer.textContent = 'finish';
    nextBtnEng.textContent = 'finish';
  } else {
    nextBtnGer.textContent = 'next';
    nextBtnEng.textContent = 'next';
  }
}
const totalOfProgress = () => {
  if (wrongAnsweredVocab.length !== 0) {
    total = wrongAnsweredVocab.length;
  } else {
    total = dictionary.length;
  }
}

function generateRandomWord(map) {
  let randomNum = Math.floor(Math.random() *map.length);
  word.innerHTML = `${map[randomNum]}?`;
  let randomWord = map[randomNum];
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

function changeBtnGer() {
  checkBtnGer.classList.toggle('hide');
  nextBtnGer.classList.toggle('hide');
}
function changeBtnEng() {
  checkBtnEng.classList.toggle('hide');
  nextBtnEng.classList.toggle('hide');
}
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

//after finisching query:
// show Score, button for new Query and button for only wrong ansered query
function finish() {
  word.textContent = `Your Score:   ${countRightAnswers}/${total}`
  progress.textContent = '';
  if (total !== 0 && wrongAnsweredVocab.length !== 0) {
    toggleWronAndNewQueryBtn();
  } else {
    const newQueryBtn = document.getElementById('newQuery');
    newQueryBtn.classList.toggle('hide');
  }
  toggleTrainingPage();
  
}
// reset is called whith click on start query
function reset() {
  countRightAnswers = 0;
  countProgress = 0;
  progress.textContent = '';
  progress.classList.remove('progress');
  word.textContent = '';
  wrongAnsweredVocab = [];
  answer.classList.remove('hide');
  answer.value = '';
  nextBtnGer.classList.add('hide');
  nextBtnEng.classList.add('hide');
  checkBtnGer.classList.add('hide');
  checkBtnEng.classList.add('hide');
  nextBtnGer.textContent = 'next';
  nextBtnEng.textContent = 'next';
  checkAnswerCorrect.textContent = '';
  removeWronAndNewQueryBtn();
  defaultCheckAnswer();
}
// back to main page
function startNewQuery() {
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
  toggleWronAndNewQueryBtn();
  currentQuery.classList.add('hide');
}
// asking only wrong ansered vocabulary
function wrongVocabAgain() {
  mapGerman = wrongAnsweredVocab.map(askedVocab => askedVocab.german);
  mapEnglish = wrongAnsweredVocab.map(askedVocab => askedVocab.english);
  toggleWronAndNewQueryBtn();
  totalOfProgress();
  reset();
  if(language === 'german') {
    nextBtnGer.classList.remove('hide');
  } else if(language === 'english') {
    nextBtnEng.classList.remove('hide');
  } else {
    startNewQuery();
  }
}

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
const removeWronAndNewQueryBtn = () => {
  const wrongAgainBtn = document.getElementById('wrongAgain');
  const newQueryBtn = document.getElementById('newQuery');
  wrongAgainBtn.classList.add('hide');
  newQueryBtn.classList.add('hide');
}
/* 
*/
