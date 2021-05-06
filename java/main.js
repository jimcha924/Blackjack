let suits = ['hearts', 'clubs', 'diamonds', 'spades'];
let values = ['ace', 'king', 'queen', 'jack', 10, 9, 8, 7, 6, 5, 4, 3, 2];

// DOM variables
let messageBox = document.querySelector('message-box');
let dealButton = document.getElementById('deal-button');
let hitButton = document.getElementById('hit-button');
let standButton = document.getElementById('stand-button');
let dealerHandContainer = document.getElementById('dealer-hand');
let playerHandContainer = document.getElementById('player-hand');
let points = document.querySelector('#points');
    
// Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
// let dealerPoints = 0;
// let playerPoints = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

makeDeck();
console.log(deck);

function makeDeck() {
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            var weight = parseInt(values[i]);
            if (values[i] == 'jack' || values [i] == 'queen' || values[i] == 'king')
                weight = 10;
            if (values[i] == 'ace')
                weight = 11;
            var card = { Value: values[i], Suit: suits[j], Weight: weight, Image: `images/${values[i]}_of_${suits[j]}.png`};
            deck.push(card);
            console.log(card);
        }
    }
}
function shuffleDeck(array) {
    console.log(array);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
    
}

var dealClicked = false;

dealButton.addEventListener("click", (e)=>{
    console.log(deck);
    // if (dealClicked === false){
        playerHand.push(shuffleDeck(deck).shift());
        playerHand.push(shuffleDeck(deck).shift());
        console.log('playerHand', playerHand);
      // console.log('c');
        dealerHand.push(shuffleDeck(deck).shift());
        dealerHand.push(shuffleDeck(deck).shift());
        console.log('dealerHand', dealerHand);
        console.log('dealerHand.length', dealerHand.length);
      // dealerhands = [{}, {}]
    for (var i = 0; i < dealerHand.length; i++){
        console.log('dealerHand[i] = ', dealerHand[i]);
        const value = dealerHand[i].Value;
        console.log("each value", value);
        const suit = dealerHand[i].Suit;
        console.log("each suit", suit);
        const imageSrc = dealerHand[i].Image;
        console.log('each image', imageSrc);
        // create <img/> element
        var dealerImg = document.createElement('img');
        dealerImg.src = imageSrc;
        console.log(dealerImg);
        dealerHandContainer.appendChild(dealerImg);
    }
      // playerHand = [{}, {}]
    for (var j = 0; j < playerHand.length; j++){
        console.log("playerHand", playerHand[j]);
        const value = playerHand[j].Value;
        console.log("each value", value);
        const suit = playerHand[j].Suit;
        console.log("each suit", suit);
        const imageSrc = playerHand[j].Image;
        console.log('each image', imageSrc);
        var playerImg = document.createElement('img');
        playerImg.src = imageSrc;
        console.log(playerImg);
        playerHandContainer.appendChild(playerImg);
    }
})

function getCards(card) {
    return card.Value + ' of ' + card.Suit;
}

function getNextCard() {
    return deck.shift();r
}

function getCardValue(card) {
    switch(card.value) {
    case 'ace':
        return 1;
    case 2:
        return 2;
    case 3:
        return 3;
    case 4:
        return 4;
    case 5:
        return 5;
    case 6:
        return 6;
    case 7:
        return 7;
    case 8:
        return 8;
    case 9:
        return 9;
    default:
        return 10; 
    }
}

function getPoints(cardArray) {
    let Points = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        Points += getCardValue(card);
        if (card.value === 'Ace') {
        hasAce = true;
        }
    }
    if (hasAce && Points + 10 <= 21) {
    return Points + 10;
    }
    return Points;
}




function updatePoints() {
    dealerPoints = getPoints(dealerHand);
    playerPoints = getPoints(playerHand);
}

function endOfGame() {

    updatePoints();

    if (gameOver) {
    // let dealer take cards
    while(dealerPoints < playerPoints
        && playerPoints <= 21
        && dealerPoints <= 21) {
        dealerHand.push(getNextCard());
        updatePoints();
            }
    }

    if (playerPoints > 21) {
    playerWon = false;
    gameOver = true;
    }
    else if (dealerPoints > 21) {
    playerWon = true;
    gameOver = true;
    }
    else if (gameOver) {
    
    if (playerPoints > dealerPoints) {
        playerWon = true;
    }
    else {
        playerWon = false;
        }
    }
}

function showStatus() {
    // if(!gameStarted) {
    // messageBox.innerText = 'Welcome to Blackjack!';
    // return;
    // }
    
    let dealerHandsString = '';
    for (let i=0; i < dealerHand.length; i++) {
    dealerHandsString += getCards(dealerHand[i]) + '\n';
    }
    
    let playerHandString = '';
    for (let i=0; i < playerHand.length; i++) {
    playerHandString += getCards(playerHand[i]) + '\n';
    showStatus();
    }
    
    updatePoints();
    
    messageBox.innerText = 
    'Dealer has:\n' +
    dealerHandsString +
    '(Points: '+ dealerPoints + ')\n\n' +
    
    'Player has:\n' +
    playerHandString +
    '(Points: '+ playerPoints + ')\n\n';
    
    if (gameOver) {
    if (playerWon) {
        messageBox.innerText += "YOU WIN!"; 
    }
    else {
        messageBox.innerText += "DEALER WINS";
    }
    dealButton.style.display = 'inline';
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
        }
    }

hitButton.addEventListener('click', function() {
    playerHand.push(shuffleDeck(deck).shift());
    endOfGame();
    showStatus();
});

standButton.addEventListener('click', function() {
    gameOver = true;
    endOfGame();
    showStatus();
});





// function playercounter(Hand){
//     console.log(Hand)
//     let points = 0
//     for (var card=0; card < Hand.length; card++){
//       console.log(card)
//       cardWorth = Hand[card].cardValue 
//       points += cardWorth
//       console.log(points)
//       while (Hand = playerHand){
//         if (points <21 ) {
//           console.log("hit me? , or stand.... ")
          
//           break
          
//         }

//         if (points > 21) {
//           console.log('game over, hit the shower')
//           //alert("Its time ")
//           break
//         }
//         if (points == 21) {
//           console.log('you are a winner!! ')
//           //alert("MONEY IN DA BANK 🤘🏽 ")
//           break
//         }
//         // points += cardWorth;
//         // card ++
//       }
//     }
// }
//     function dealercounter(Hand){
//       console.log(Hand)
//       let points = 0
//       for (var card=0; card < Hand.length; card++){
//         console.log(card)
//         cardWorth = Hand[card].cardValue 
//         points += cardWorth
//       while (Hand = dealerHand){
//         if (points < 17 ) {
//           console.log("hit me? , or stand.... ")
//           break
//         }

//         if (points >= 17 && points < 21) {
//           console.log('match or take hike!!')
//           break
//         }
//         if (points > 21)
//           console.log ('You win!!!!')
//           break
        

//         // points += cardWorth;
//         // card ++
//       }
    

    
//     // console.log(card)
//     console.log(points)
  
    
  
// }
// }

  

// hit.addEventListener('click', (e) => {
//   hitting(cards, player);
//   //alert("Pick an Option, stand or take a hit ");
  

// //console.log('cards have been delt')
// })
// stand.addEventListener('click', (e) => {
//   standing(cards, dealer);

// })
//     })