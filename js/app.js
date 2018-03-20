/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

addEventListenerList(document.querySelectorAll(".card"),"mousedown",function(event){
  const openedCard = document.querySelector(".open");
  if(this.classList.item(1)!="match" && this!==openedCard){
    if(openedCard!=null && openedCard.firstElementChild.classList.item(1)==this.firstElementChild.classList.item(1))
    {
      hideCards(openedCard,this);
      openedCard.classList.add("match");
      this.classList.add("match");
      this.removeEventListener("mousedown",)
    }else if(openedCard!=null){
      let thisEl=this;
      this.classList.add("open","show");
      setTimeout(function (){hideCards(openedCard , thisEl)}, 400);
    }else{
    this.classList.add("open","show");
    }
  }
});

function hideCards(oldCard,newCard){
  oldCard.classList.remove("open","show");
  newCard.classList.remove("open","show");
};

function addEventListenerList(list,ev,foo)
{
  list.forEach((e)=>e.addEventListener(ev,foo));
}; //function for add eventlistener to a list of elements

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
