
//let vocabularyList = document.querySelector("#vocabulary-list");
const answer = document.getElementById('answer');
const german = document.querySelector("#german");
const english = document.querySelector("#english");
const addItemBtn = document.getElementById('addItemBtn');
const vocabList = document.getElementById("vocabularyList");
let dictionary =  JSON.parse(localStorage.getItem('dictionary') || []);
let item = {};


// adds new Items to dictionary and local storage and calls the updateItemList function
const addVocabulary = () => {  
  if (german.value == '' || english.value == '') {
    return
  }
  let item = {
        'german': german.value,
        'english': english.value,
        'id':  new Date().getTime()
    }
    //localStorage.setItem('item', JSON.stringify(item));
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

//find index of an element onclick, deletes item by index from dictionary and local storage and updates ItemList
const deleteVocab = (element) => {
  let dictionaryId = dictionary.map(dictionary => dictionary.id);
  let index = dictionaryId.findIndex(id => id == element.parentNode.id);

    dictionary.splice(index, 1);
    updateItemList();
    localStorage.setItem('dictionary', JSON.stringify(dictionary));

        console.log(dictionary);
};

//adding check and next buttons by id for the next steps
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const checkAnswerCorrect = document.getElementById('checkAnswer');

let indexGerman;

  

//asks a random Item from dictionary in german by clicking on next button
function nextVocabulary() {
  answer.value = '';
  let dictio = dictionary.map(dictionary => dictionary.german);
  let randomNum = Math.floor(Math.random() *dictio.length);
  let word = document.getElementById("word");
  word.innerHTML = `${dictio[randomNum]}?`;
  indexGerman = dictio.findIndex(german => german == dictio[randomNum]);
  
  changeBtn();
  console.log(dictio[randomNum]);
  
  return indexGerman;
}
//checks if anser input is correct by clicking on check button
function checkAnswer() {
  
  let indexMapEnglish = dictionary.map(dictionary => dictionary.english);
  let indexEnglish = indexMapEnglish.findIndex(english => english == answer.value);
    if(indexEnglish === indexGerman) {
        checkAnswerCorrect.textContent = 'Right answer!';
    } else {
      checkAnswerCorrect.textContent = 'Sorry, that`s not the answer';
    }
  console.log(indexEnglish);
  console.log(indexMapEnglish);
  console.log(indexGerman);
  
  changeBtn();
}
//hides one button and shows the other, when button is clicked, 
//so that the user has only one button on the screen
function changeBtn() {
  checkBtn.classList.toggle('hide');
  nextBtn.classList.toggle('hide');

}

 