// script.js  
const cards = [  
    'A', 'A',  
    'B', 'B',  
    'C', 'C'  
];  
  
let flippedCards = [];  
let timeLeft = 30;  
let timerInterval;  
  
function shuffle(array) {  
    for (let i = array.length - 1; i > 0; i--) {  
        const j = Math.floor(Math.random() * (i + 1));  
        [array[i], array[j]] = [array[j], array[i]];  
    }  
    return array;  
}  
  
function initGame() {  
    const gameBoard = document.getElementById('game-board');  
    gameBoard.innerHTML = '';  
    flippedCards = [];  
    timeLeft = 30;  
    document.getElementById('time-left').innerText = timeLeft;  
    document.getElementById('game-over').classList.add('hidden');  
  
    const shuffledCards = shuffle(cards);  
    for (let card of shuffledCards) {  
        const cardElement = document.createElement('div');  
        cardElement.classList.add('card', 'back');  
        cardElement.dataset.card = card;  
        cardElement.addEventListener('click', flipCard);  
        gameBoard.appendChild(cardElement);  
    }  
  
    timerInterval = setInterval(countDown, 1000);  
}  
  
function flipCard(event) {  
    const cardElement = event.target;  
    if (cardElement.classList.contains('flipped') || flippedCards.length === 2) return;  
  
    cardElement.classList.remove('back');  
    cardElement.classList.add('flipped');  
    cardElement.style.backgroundImage = `url('${cardElement.dataset.card}.jpg')`; // 这里指定正面图案的路径，根据card的值变化  
  
    flippedCards.push(cardElement);  
  
    if (flippedCards.length === 2) {  
        setTimeout(() => {  
            if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {  
                flippedCards = [];  
            } else {  
                flippedCards.forEach(card => {  
                    card.classList.remove('flipped');  
                    card.classList.add('back');  
                });  
                flippedCards = [];  
            }  
        }, 500); // 给予短暂时间让玩家看到牌面  
    }  
  
    checkGameOver();  
}  
  
function countDown() {  
    timeLeft--;  
    document.getElementById('time-left').innerText = timeLeft;  
    if (timeLeft <= 0) {  
        clearInterval(timerInterval);  
        showGameOver('闯关失败');  
    }  
}  
  
function checkGameOver() {  
    const allCards = document.querySelectorAll('.card');  
    if (Array.from(allCards).every(card => !card.classList.contains('back'))) {  
        clearInterval(timerInterval);  
        showGameOver('恭喜过关');  
    }  
}  
  
function showGameOver(message) {  
    document.getElementById('game-over-message').innerText = message;  
    document.getElementById('game-over').classList.remove('hidden');  
}  
  
document.getElementById('restart-button').addEventListener('click', initGame);  
  
window.onload = initGame;