let minute = 0;
let seconde = 0;
let intervalId;
const timerDisplay = document.querySelector("#timer");
const jouer = document.querySelector("#button");


jouer.addEventListener("click", () => {
  intervalId = setInterval(() => {
    seconde++;
    if (seconde === 60) {
      seconde = 0;
      minute++;
    }
    timerDisplay.textContent = `Temps : ${minute}'${seconde}`;
  }, 1000);

  jouer.style.display = "none";
});

const gameBoard = document.querySelector('.game-board');
const values = [1, 2, 3, 4, 5, 6, 7, 8];
const cards = [...values, ...values]; 


cards.sort(() => Math.random() - 0.5);


cards.forEach(value => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value; 
  card.innerHTML = '?'; 
  gameBoard.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false; 
let paire=null;

gameBoard.addEventListener('click', e => {
  const clickedCard = e.target;

  if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('flipped') || lockBoard) return;

  clickedCard.classList.add('flipped');
  clickedCard.innerHTML = clickedCard.dataset.value;
  


  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    lockBoard = true;

  
    if (firstCard.dataset.value === secondCard.dataset.value) {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        firstCard.classList.add("paire");
        secondCard.classList.remove("flipped");
        secondCard.classList.add('paire'); 
      
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        
              
        if (document.querySelectorAll('.card.paire').length === 16) {
          setTimeout(() => {
            clearInterval(intervalId); 
            alert(`Bravo ! Vous avez gagné en ${minute} minutes et ${seconde} secondes !`);
            location.reload(); 
          }, 500);
        }
      }, 500); 
    } else {

      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '?';
        secondCard.innerHTML = '?';
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
});