// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.addEventListener('DOMContentLoaded', function () {
  const fullDeck = ["fa-diamond" ,"fa-diamond" , "fa-rocket" , "fa-rocket" , "fa-paperclip" , "fa-paperclip" , "fa-motorcycle" , "fa-motorcycle" , "fa-birthday-cake" , "fa-birthday-cake" , "fa-image" , "fa-image" , "fa-home" , "fa-home" , "fa-fire-extinguisher" , "fa-fire-extinguisher" , "fa-fire" , "fa-fire" , "fa-cloud" , "fa-cloud" , "fa-camera" , "fa-camera" , "fa-align-justify" , "fa-align-justify" , "fa-bell" , "fa-bell" , "fa-beer" , "fa-beer" , "fa-bed" , "fa-bed" , "fa-angellist" , "fa-angellist" ];
  // complete deck of cards 32 cards
  let deck = document.querySelector(".deck");
  let numCard = 4;
  let moves = document.querySelector(".moves");
  let tmpRes = 0;
  let finalRes = 0;
  let star3class = document.querySelector(".result>.star3res");
  let star2class = document.querySelector(".result>.star2res");
  createDeck(numCard);
  addEventCards();

  function createDeck(dimension) {
    deck.style.minHeight = dimension<10 ?  "27vw" : "50vw" ;
    if(dimension != 4 && dimension != 32){
      deck.style.width = "50vw";
    }else if(dimension == 4){
      deck.style.width = "26vw";
    }else{
      if(window.innerWidth >= window.innerHeight){ // change expantion for smartphone portrait
        deck.style.width = "94vw";
      }else{
        deck.style.minHeight = "94vw";
      }
    }

    let deckPortion = fullDeck.slice(0 , dimension);
    deckPortion = shuffle(deckPortion);
    const deckFrag = document.createDocumentFragment();

    for(let i=0; i<dimension;i++)
    {
      const card = document.createElement('li');
      card.classList.add("card");
      const tmpI = document.createElement('i');
      tmpI.classList.add("fa",deckPortion[i]);
      card.append(tmpI);
      deckFrag.appendChild(card);
    }// create a frag element with all the cards of this phase

    deck.appendChild(deckFrag);
  }

  function addEventCards(){
  addEventListenerList(document.querySelectorAll(".card"),"mousedown",function(event){
    const openedCard = document.querySelectorAll(".open");
    if(this.classList.item(1)!= "match" && this !== openedCard[0]){
      if(openedCard.length == 1 && openedCard[0].firstElementChild.classList.item(1) == this.firstElementChild.classList.item(1)) {// cards match
        // openedCard.length==1 for how click faster than the animation of card coling
        hideCards(openedCard[0],this);
        openedCard[0].classList.add("match");
        this.classList.add("match");
        moves.textContent++;
        checkStars();
      }else if(openedCard.length == 1){// cards not match
        let thisEl = this;
        this.classList.add("open","show");
        moves.textContent++;
        checkStars();
        setTimeout(function (){
          hideCards(openedCard[0] , thisEl)
        }, 400);// leave a few seconds to see the cards
        // if i only pass 'this' it point to the element Windows
      }else{// first card
        this.classList.add("open","show");
      }
      if(document.querySelectorAll(".match").length == numCard){
        if(numCard != 32){
          finalRes+= tmpRes;
          numCard = numCard*2;
          cleanAndPlaceDeck();
          showStars();
        }else{
          finalRes+= tmpRes;
          finalRes = finalRes/4;
          document.querySelector(".result").style.display = "block";
          if(finalRes < 3 && finalRes >= 2){
            document.querySelector(".result>h2").innerHTML = "Good!";
            if(finalRes >= 2.5){
              star3class.classList.replace("fa-star","fa-star-half");
            }else{
              star3class.style.display = "none";
            }
          }else if(finalRes<3){
            star3class.style.display = "none";
            document.querySelector(".result>h2").innerHTML="Bad, but you can do better!"
            if(finalRes >= 1.5){
              star2class.classList.replace("fa-star","fa-star-half");
            }else{
              star2class.style.display = "none";
            }
          }
        }
      }
    }
  });
}

function cleanAndPlaceDeck(){
  let cards = document.querySelectorAll(".card");
  for(let i = 0; i < cards.length; i++)
  {
    cards[i].remove();
  }
  setTimeout(function (){
    createDeck(numCard);
    addEventCards();
  }, 300);
  moves.textContent = 0;
}

  function hideCards(oldCard,newCard){
    oldCard.classList.remove("open","show");
    newCard.classList.remove("open","show");
  };

  function addEventListenerList(list,ev,foo){
    list.forEach((e)=>e.addEventListener(ev,foo));
  }; // function for add eventlistener to a list of elements

  document.querySelector(".restart").addEventListener("click",function (){
    cleanAndPlaceDeck();
    showStars();
  });

  document.querySelector(".btnRestart").addEventListener("click",function (){
    numCard = 4;
    finalRes = 0;
    cleanAndPlaceDeck();
    showStars();
    document.querySelector(".result").style.display = "none";
    document.querySelector(".result>h2").innerHTML="PERFECT!!!!!"
    star3class.classList.replace("fa-star","fa-star");
    star2class.classList.replace("fa-star","fa-star");
  });

  function checkStars(){
    tmpRes = 3;
    if(parseInt(moves.textContent) >= Math.round(numCard*1.1)){
      tmpRes = 1;
      document.querySelector(".star3").style.display = "none";
      document.querySelector(".star2").style.display = "none";
    }else if(parseInt(moves.textContent) >= Math.round(numCard*0.9)){
      tmpRes = 2;
      document.querySelector(".star3").style.display = "none";
    }
  };

  function showStars(){
    document.querySelector(".star3").style.display = "inline";
    document.querySelector(".star2").style.display = "inline";
  };
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
