//Define global variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.getElementsByClassName('btn__reset')[0];
const title = document.getElementsByClassName('title')[0];
let button = document.querySelectorAll('button');
let missed = 0;


//Remove overlay on button click
startGame.addEventListener('click',function(){
	
	if(startGame.innerHTML === 'Start Game'){

		const overlay = document.getElementById('overlay');
		overlay.classList.remove('start');
		overlay.style.display = 'none';

	} else if(startGame.innerHTML === 'Reset') {

		window.location.reload();

	}
	
});


//Popular phrases

let phrases = ['a dime a dozen', 'burst your bubble', 'cry wolf', 'down to earth', 'easy as pie'];


//Choose a random phrase
const getRandomPhraseAsArray = (array) => {

	//Set random number and random phrase
	let randomNumber = Math.floor(Math.random() * array.length);
	let randomPhrase = array[randomNumber];
	let eachCharacter = randomPhrase.split('');
	return eachCharacter;

};

let phraseArray = (getRandomPhraseAsArray(phrases));

//Add phrase to display 
const addPhraseToDisplay = (array) => {


	for(let i = 0; i < phraseArray.length; i++){

		//Set local variables
		const phraseUl = document.querySelectorAll('ul')[0];
		let createLi = document.createElement('li');

		createLi.innerHTML = (phraseArray)[i];
		phraseUl.appendChild(createLi);
		

		if(phraseArray[i] !== " "){
			
			createLi.classList.add('letter');

		} else {
			
			createLi.classList.add('space');

		}
	}

};


const checkLetter = (button) => {

	const letters = document.getElementsByClassName('letter');
	letterFound = false;
	for( let i = 0; i < letters.length; i++) {

		innerLetter = (letters)[i].innerHTML;

		if(innerLetter === button.innerHTML){

			letters[i].classList.add('show');
			letterFound = true;
		} 
	}

	return letterFound ? button.innerHTML : null;

};

//Check win function
const checkWin = () => {

	//Set local variables
	let numLetters = document.getElementsByClassName('letter');
	let numShow = document.getElementsByClassName('show');

	//Compare letters length to show length
	if(numLetters.length === numShow.length){

		overlay.classList.add('win');
		overlay.style.display = 'flex';
		startGame.innerHTML = 'Reset';
        title.innerHTML = 'You Win!!';

	} else if(missed >=5) {

		overlay.classList.add('lose');
		overlay.style.display = 'flex';
		startGame.innerHTML = 'Reset';
        title.innerHTML = 'You lose,Try Again!!';

	}

};

//Event listener for keyboard clicks
keyboard.addEventListener("click", (event) => {

	const buttonClicked = event.target;
	const orderedList = document.querySelectorAll('ol')[0];
	const hearts = document.getElementsByClassName('tries')[0];

	if(buttonClicked.tagName === 'BUTTON'){
		
		buttonClicked.classList.add('chosen')
		buttonClicked.setAttribute('disabled',true);

		let letterFound = checkLetter(buttonClicked);

		if(letterFound === null) {
		
			missed += 1;
			orderedList.removeChild(hearts);

		}
	}

	checkWin();

});



addPhraseToDisplay(phraseArray);









