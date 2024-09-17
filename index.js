
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

//find index of clicked parent element, deletes item by index from dictionary and local storage and updates ItemList
const deleteVocab = (element) => {
  let dictionaryId = dictionary.map(dictionary => dictionary.id);
  let index = dictionaryId.findIndex(id => id == element.parentNode.id);

    dictionary.splice(index, 1);
    updateItemList();
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
        console.log(dictionary);
};

//here starts script for training page, for a query from german to english
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const checkAnswerCorrect = document.getElementById('checkAnswer');
const showAnswer = document.getElementById('showAnswer');

let mapGerman = dictionary.map(dictionary => dictionary.german);
let mapEnglish = dictionary.map(dictionary => dictionary.english);
 let askedVocab = [];
let indexGerman;
let countRightAnswers = 0;

//generates a random Item from dictionary in german by clicking on next button
function nextVocabulary() {
  answer.value = '';
  checkAnswerCorrect.innerHTML = '';
  showAnswer.innerHTML = '';
  let randomNum = Math.floor(Math.random() *mapGerman.length);
  let word = document.getElementById("word");
  word.innerHTML = `${mapGerman[randomNum]}?`;
  let randomWord = mapGerman[randomNum];
  
  findGermanIndex(randomWord);
  defaultCheckAnswer();
  changeBtn();
}  
//find index of german word
function findGermanIndex (randomWord) {
  indexGerman = mapGerman.findIndex(german => german == randomWord);
  return indexGerman;
}/**/
//checks if anser input is correct by clicking on check button
function checkAnswer() {
  console.log(mapGerman);
  let indexEnglish = mapEnglish.findIndex(english => english == answer.value);
    if(indexEnglish === indexGerman) {
        checkAnswerCorrect.textContent = 'Right answer!';
        countRightAnswers ++
    } else {
      checkAnswerCorrect.innerHTML = `Sorry, that's not the answer <button class="show-answer-button">display answer?</button>`;
      showAnswer.innerHTML = `${mapEnglish[indexGerman]}`
    }
  newArray();
  deleteFromQuery()
  changeBtn();

  if (mapGerman.length === 0) {
    console.log(mapGerman.length, dictionary.length);
    alert(` Score: ${countRightAnswers}/${dictionary.length}`)
  }

}

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
//hides one button and shows the other when button is clicked, 
//so that the user has only one of these buttons on their screen
function changeBtn() {
  checkBtn.classList.toggle('hide');
  nextBtn.classList.toggle('hide');
}

// shows right answer onclick if answer was wrong
checkAnswerCorrect.addEventListener('click', ()  => {
  checkAnswerCorrect.classList.toggle('hide');
  showAnswer.classList.toggle('hide');
});

//hiding showAnswer and showing checkAnswerCorrect if class was toggled
function defaultCheckAnswer () {
  checkAnswerCorrect.classList.remove('hide');
  showAnswer.classList.add('hide');
}
