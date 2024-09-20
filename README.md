 

<img align="left" src="https://github.com/c-bakis/vocabulary-trainer-js/blob/main/png/icon.PNG" alt="v icon"/> 
<br/>

# Vocabulary Trainer

<br clear="left"/>

![Static Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)


## Features

<img align="left" src="https://github.com/c-bakis/vocabulary-trainer-js/blob/main/png/main-page.PNG" alt="main page" width="350"/>
Start a new training or edit your vocabulary list. 
<br clear="left"/>
<br/>

<img align="left" src="https://github.com/c-bakis/vocabulary-trainer-js/blob/main/png/training-page.PNG" alt="training page" width="350"/>
Ask vocabulary one by one, answer via input and see immediately whether your answer is correct.
 <br clear="left"/>
 <br/>

<img align="left" src="https://github.com/c-bakis/vocabulary-trainer-js/blob/main/png/list-page.PNG" alt="list page" hight="350" width="350px"/>
Enter new vocabulary in the input field, this will be saved locally. 
Look at your list of vocabulary and delete vocabulary that you no longer need.
<br clear="left"/>
<br/>

## My Process 

### Built with

 - HTML 5
 - CSS 3
 - Vanilla JavaScript

### What am I currently working on?

- reset function
- possibility for asking only wrong answered vocabulary again

### Why a vocabulary trainer?

With the knowledge that I had previously acquired and the idea of building something useful for our family, especially for my kids, I started this Project.
I am learning a lot as I progress, such as how to use local storage to store my vocabulary objects locally:
```bash
let item = {
        'german': german.value,
        'english': english.value,
        'id':  new Date().getTime()
    }
    dictionary.push(item);
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
      
```
<br/>

## Installation

clone repository:
```bash
git clone https://github.com/c-bakis/vocabulary-trainer-js.git
```

Navigate to the project repository
```bash
cd vocabulary-trainer-js
```


<br/>

## Contributing

You are welcome to contribute to my project by creating an issure or making a pull request

## Author 

my Profile [ch-bakis](https://github.com/c-bakis)
