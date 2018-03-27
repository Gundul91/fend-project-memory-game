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
    const fullDeck = ["fa-diamond", "fa-diamond", "fa-rocket", "fa-rocket", "fa-paperclip", "fa-paperclip", "fa-motorcycle", "fa-motorcycle", "fa-birthday-cake", "fa-birthday-cake", "fa-image", "fa-image", "fa-home", "fa-home", "fa-fire-extinguisher", "fa-fire-extinguisher", "fa-fire", "fa-fire", "fa-cloud", "fa-cloud", "fa-camera", "fa-camera", "fa-align-justify", "fa-align-justify", "fa-bell", "fa-bell", "fa-beer", "fa-beer", "fa-bed", "fa-bed", "fa-angellist", "fa-angellist"];
    // complete deck of cards 32 cards
    let deck = document.querySelector(".deck");
    let numCard = 4;
    let moves = document.querySelector(".moves");
    let tmpRes = 0;
    let finalRes = 0;
    let star3class = document.querySelector(".result>.star3res");
    let star2class = document.querySelector(".result>.star2res");
    let x;

    startTimer();
    createDeck(numCard);
    addEventCards();

    document.querySelector(".restart").addEventListener("click", function () {
        cleanAndPlaceDeck();
        showStars();
    });

    document.querySelector(".btnRestart").addEventListener("click", function () {
        numCard = 4;
        finalRes = 0;
        cleanAndPlaceDeck();
        showStars();
        document.querySelector(".result").style.display = "none";
        document.querySelector(".result>h2").innerHTML = "PERFECT!!!!!"
        star3class.classList.replace("fa-star", "fa-star");
        star2class.classList.replace("fa-star", "fa-star");
        startTimer();
    });

    /**
    * @description Create and append a deck of li
    * @param {number} dimension
    */

    function createDeck(dimension) {
        deck.style.minHeight = dimension<10 ?  "27vw" : "50vw" ;
        if(dimension == 32){
            if(window.innerWidth >= window.innerHeight){ // change expantion for smartphone portrait
                deck.style.width = "94vw";
            }else{
                deck.style.minHeight = "94vw";
            }
        }else if(dimension == 4){
            deck.style.width = "26vw";
        }else{
        deck.style.width = "50vw";
        }

        let deckPortion = fullDeck.slice(0, dimension);
        deckPortion = shuffle(deckPortion);
        const deckFrag = document.createDocumentFragment();

        for(let i = 0; i<dimension; i++)
        {
            const card = document.createElement('li');
            card.classList.add("card");
            const tmpI = document.createElement('i');
            tmpI.classList.add("fa", deckPortion[i]);
            card.append(tmpI);
            deckFrag.appendChild(card);
        }// create a frag element with all the cards of this phase

        deck.appendChild(deckFrag);
    }

    /**
    * @description add the event listener "mousedown" at the cards
    */

    function addEventCards() {
        addEventListenerList(document.querySelectorAll(".card"), "mousedown", function () {
            const openedCard = document.querySelectorAll(".open");
            if(this.classList.item(1) != "match" && this !== openedCard[0]) { //control if you click a card already opened
                if(openedCard.length == 1 && openedCard[0].firstElementChild.classList.item(1) == this.firstElementChild.classList.item(1)) {// cards match
                    // openedCard.length==1 for who click faster than the animation of card comparing
                    hideCards(openedCard[0],this); //remove open and show classes from the 2 cards
                    openedCard[0].classList.add("match");
                    this.classList.add("match");
                    moves.textContent++;
                    checkStars();
                }else if(openedCard.length == 1) {// cards don't match
                    let thisEl = this;
                    this.classList.add("open", "show");
                    moves.textContent++;
                    checkStars();
                    setTimeout(function () {
                      hideCards(openedCard[0], thisEl)
                    }, 400);// leave a few seconds to see the cards
                    // if i only pass 'this' it point to the element Windows
                }else{// first card
                    this.classList.add("open", "show");
                }

                if(document.querySelectorAll(".match").length == numCard) { // if all combination are found
                    if(numCard != 32) { // if is not the last level
                        finalRes += tmpRes;
                        numCard = numCard*2;
                        cleanAndPlaceDeck();
                        showStars();
                    }else { // if is the last level
                        stopTimer();
                        document.querySelector(".timerRes").innerHTML=document.querySelector(".timer").innerHTML;
                        finalRes += tmpRes;
                        finalRes = finalRes/4;
                        document.querySelector(".result").style.display = "block";
                        if(finalRes < 3 && finalRes >= 2){
                            document.querySelector(".result>h2").innerHTML = "Good!";
                            if(finalRes >= 2.5){
                                star3class.classList.replace("fa-star", "fa-star-half");
                            }else{
                                star3class.style.display = "none";
                            }
                        }else if(finalRes < 3) {
                            star3class.style.display = "none";
                            document.querySelector(".result>h2").innerHTML="Bad, but you can do better!"
                            if(finalRes >= 1.5) {
                                star2class.classList.replace("fa-star", "fa-star-half");
                            }else {
                                star2class.style.display = "none";
                            }
                        }
                    }
                }
            }
        });
    }

    /**
    * @description Start the timer
    */

    function startTimer() {
        const timer = document.querySelector(".timer");
        timer.innerHTML= "00:00";
        start=new Date().getTime();
        x = setInterval(function() {
            let time=new Date().getTime()-start;
            let minutes = "0" + Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // add a 0 to don't ave time like 0:1
            let seconds = "0" + Math.floor((time % (1000 * 60)) / 1000);
            timer.innerHTML=minutes.slice(-2) + ":" + seconds.slice(-2);
        }, 1000);
    }

    /**
    * @description stom the timer
    */

    function stopTimer() {
        clearInterval(x);
    }

    /**
    * @description replace current deck with the next
    */

    function cleanAndPlaceDeck() {
        let cards = document.querySelectorAll(".card");
        for(let i = 0; i < cards.length; i++)
        {
            cards[i].remove();
        }

        setTimeout(function () {
            createDeck(numCard);
            addEventCards();
        }, 300);

        moves.textContent = 0;
    }

    /**
    * @description hide this 2 cards
    * @param {number} oldCard
    * @param {number} newCard
    */

    function hideCards(oldCard, newCard) {
        oldCard.classList.remove("open", "show");
        newCard.classList.remove("open", "show");
    }

    /**
    * @description add the same event listener to a list of elements
    */

    function addEventListenerList(list,ev,foo) {
        list.forEach((e) => e.addEventListener(ev, foo));
    }

    /**
    * @description check what number of stars show
    */

    function checkStars() {
        tmpRes = 3;
        if(parseInt(moves.textContent) >= Math.round(numCard * 1.1)) {
            tmpRes = 1;
            document.querySelector(".star3").style.display = "none";
            document.querySelector(".star2").style.display = "none";
        }else if(parseInt(moves.textContent) >= Math.round(numCard * 0.9)) {
            tmpRes = 2;
            document.querySelector(".star3").style.display = "none";
        }
    }

    /**
    * @description reshow all stars
    */

    function showStars() {
        document.querySelector(".star3").style.display = "inline";
        document.querySelector(".star2").style.display = "inline";
    }
});
