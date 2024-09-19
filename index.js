
// switch between pages
const listPage = document.getElementById('list');
const trainingPage = document.getElementById('training');
const mainPage = document.getElementById('main');
const backBtn = document.querySelectorAll('.to-main-page');
const listPageBtn = document.getElementById('to-list-page');
const trainingBtn = document.getElementById('start-training');

trainingBtn.addEventListener('click', () => {
  trainingPage.classList.toggle('hide');
  mainPage.classList.toggle('hide');
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
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const checkAnswerCorrect = document.getElementById('checkAnswer');
const showAnswer = document.getElementById('showAnswer');
const progress = document.getElementById('progress');

let mapGerman = dictionary.map(dictionary => dictionary.german);
let mapEnglish = dictionary.map(dictionary => dictionary.english);
let askedVocab = [];
let indexGerman;
let indexEnglish;
let countRightAnswers = 0;
let countProgress = 0;

// onclick next button
function nextVocabularyGerman() {
  clear()
  currentProgress(); 
  generateRandomWord(mapGerman);
  changeBtn();
  defaultCheckAnswer();
  checkFinish(mapEnglish);
}  

function nextVocabularyEnglish() {
  clear()
  currentProgress(); 
  generateRandomWord(mapEnglish);
  changeBtn();
  defaultCheckAnswer();
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
  let total = dictionary.length;
  progress.innerHTML = `${countProgress}/${total}`;
  progress.classList.add('progress');
  if (countProgress === dictionary.length) {
    nextBtn.textContent = 'finish';
  } else {
    nextBtn.textContent = 'next';
  }
}

function generateRandomWord(item) {
  let randomNum = Math.floor(Math.random() *item.length);
  let word = document.getElementById("word");
  word.innerHTML = `${item[randomNum]}?`;
  let randomWord = item[randomNum];
  console.log(this);

  findGermanIndex(randomWord);
}

function findGermanIndex (randomWord) {
  indexGerman = mapGerman.findIndex(german => german == randomWord);
   return indexGerman;
}
function findEnglishIndex (randomWord) {
  indexEnglish = mapEnglish.findIndex(english => english == randomWord);
  return indexEnglish;
}
//display only one button at a time
function changeBtn() {
  checkBtn.classList.toggle('hide');
  nextBtn.classList.toggle('hide');
}
//hiding showAnswer and showing checkAnswerCorrect if class was toggled
function defaultCheckAnswer () {
  checkAnswerCorrect.classList.remove('hide');
  showAnswer.classList.add('hide');
}

/**/
//onclick check button
function checkAnswer() {
  indexEnglish = mapEnglish.findIndex(english => english == answer.value);
  answerRight(mapEnglish);
  deleteFromQuery()
  changeBtn();
}


function answerRight (map) {
  if(indexEnglish === indexGerman && map.length !== 0) {
    checkAnswerCorrect.textContent = 'Right answer!';
    countRightAnswers ++
} else if (indexEnglish !== indexGerman && map.length !== 0) {
  checkAnswerCorrect.innerHTML = `Sorry, that's not the answer <button class="show-answer-button">display answer?</button>`;
  showAnswer.innerHTML = `${map[indexGerman]}`
  newArray();
} else {
  return
}}


function deleteFromQuery () {
mapEnglish.splice(indexGerman, 1);
mapGerman.splice(indexGerman, 1);
}

function newArray () {
  let english = mapEnglish[indexGerman];
  let german = mapGerman[indexGerman]
  let obj = {'english': english, 'german': german}
  askedVocab.push(obj);
}

// shows right answer onclick if answer was wrong
checkAnswerCorrect.addEventListener('click', ()  => {
  checkAnswerCorrect.classList.toggle('hide');
  showAnswer.classList.toggle('hide');
});

// show Score, button for new Query and button for only wrong ansered query
function finish(map) {
  console.log(map.length, dictionary.length);
  let word = document.getElementById("word");
  word.textContent = `Your Score:   ${countRightAnswers}/${dictionary.length}`
  progress.classList.toggle('progress');
  progress.textContent = '';
  checkBtn.classList.toggle('hide');
  answer.classList.toggle('hide');
  const answerContainer = document.getElementById('answer-container')
  answerContainer.innerHTML += `<button class="list-button">new query</button><button class="list-button">wrong ones again</button>`
}

function wronVocabAgain() {

}

function startNewQuery() {

}