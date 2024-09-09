
//let vocabularyList = document.querySelector("#vocabulary-list");
const answer = document.getElementById('answer');
const german = document.querySelector("#german");
const english = document.querySelector("#english");
const addItemBtn = document.getElementById('addItemBtn');
const vocabList = document.getElementById("vocabularyList");
let dictionary =  JSON.parse(localStorage.getItem('dictionary') || []);
let item = {};


// adds new Items to dictionary and calls update ItemList
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
      
    // console.log(dictionary);
      updateItemList(item);
  
  

  german.value = '';
  english.value = '';
} 

//updates List of Vokabulary Items
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

//deletes vokabulary items from dictionary and updates ItemList
const deleteVocab = (element) => {
  let dictionaryId = dictionary.map(dictionary => dictionary.id);
  let index = dictionaryId.findIndex(id => id == element.parentNode.id);

    dictionary.splice(index, 1);
    updateItemList();
    localStorage.setItem('dictionary', JSON.stringify(dictionary));

        console.log(dictionary);
};
  

function nextVocabulary() {
  let dictio = dictionary.map(dictionary => dictionary.german);
  let randomNum = Math.floor(Math.random() *dictio.length);
  let word = document.getElementById("word");
  word.innerHTML = `${dictio[randomNum]}?`;
  answer.value = '';
  
  changeBtn();
}

function changeBtn() {
  
console.log();
}

 