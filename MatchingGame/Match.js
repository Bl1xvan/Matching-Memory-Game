let container2 = document.getElementById("container2");

//SORTING COMPLETE!!

const fullDeck = [
  {hWord: "Ha"},
  {hWord: "Hu"},
  {hWord: "Hi"},
  {hWord: "He"},
  {hWord: "Ha"},
  {hWord: "Ho"},
  {hWord: "Ho"},
  {hWord: "He"},
  {hWord: "Hu"},
  {hWord: "Hi"}
];


function sortCards(){
  fullDeck.sort(function(a, b){
    return 0.5 - Math.random();
  })
  deckStyle();
}

function deckStyle(){
  let text = "";
  for(let card in fullDeck){
  text += `<div class="maybe"><h1>`+ fullDeck[card].hWord +`</h1></div>`;
  } 
  container2.innerHTML = text;
}

let matchDeck;
let judgement = document.getElementById("judgement");
let demoScore = document.getElementById("score");
let original = document.querySelectorAll(".original");
let start = document.getElementById("startgame");

function begin(){
start.addEventListener("click", flipCards);
}
function stop(){
start.removeEventListener("click", flipCards);
start.innerHTML = "Started";
start.style.backgroundColor = "cyan";
}
//flips the cards and starts the timer

begin();
var timerStop;
let seconds;

function flipCards(){
  sortCards();
  for(let o in original){
  original[o].className = "maybe";
  }
  timer.innerHTML = "Timer On!";
  judgement.innerHTML = "Judgement: None Yet";
  sortCards();
  let maybe = document.querySelectorAll(".maybe");
  setTimeout(() => {
      matchDeck = 0;
      demoScore.innerHTML = "Matches so far: 0";
      seconds = 30;
      timerOn();
      timerStop = setInterval(countDown, 1000);
      for(let m in maybe){
      maybe[m].className = "original";
      document.addEventListener("click", startGame);
      container2.style.backgroundColor = "pink";
      stop();
    }
  }, 2000);


}

//fires if you lose the game

let setTime

function timerOn(){
  setTime = setTimeout(() =>{
    document.removeEventListener("click", startGame);
    var backgroundLoss = document.getElementById("container2");
    backgroundLoss.style.backgroundColor = "gray";
    timer.innerHTML = "Too Late!";
    judgement.innerHTML = "Judgement: Loss. Press start to play again";
    clearInterval(timerStop);
    start.innerHTML = "Replay";
    start.style.backgroundColor = "pink";
    begin();
    }, 32000);
  }

  //the timer itself

  const timer = document.getElementById("timer");
 
  function countDown(){
    let moreSeconds = seconds--;
    timer.innerHTML = "Time left: " + moreSeconds + " seconds";
  }

//the actual clicking game

function startGame(event){
    if(event.target.matches(".original")){ 
        event.target.className = "maybe";
          let matchCard = document.querySelectorAll(".maybe");       
          for(let i in matchCard){
                if(i==1){
                  if(matchCard[0].innerHTML===matchCard[1].innerHTML){
                    matchCard[0].className = "match";
                    matchCard[1].className = "match";
                    matchDeck++
                    demoScore.innerHTML = "Matches so far: " + matchDeck.toString();
                    
                    }else{ 
                    //how to prevent other cards from being clicked. Come back later
                    setTimeout(() => {
                     matchCard[0].className = "original";
                     matchCard[1].className = "original";
                    }, 1500);
                    }
                  }
                    if(matchDeck === 5){
                      judgement.innerHTML = "Judgement: Victory! Press Start to play again";
                      timer.innerHTML = "Cleared!";
                      clearTimeout(setTime);
                      clearInterval(timerStop);
                      start.innerHTML = "Replay";
                      start.style.backgroundColor = "pink";
                      begin();
                    } 
                }
               } 
              }
    