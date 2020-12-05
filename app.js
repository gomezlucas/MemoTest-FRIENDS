let cards = ["card1.jpg", "card2.jpg", "card3.jpg", "card4.jpg", "card5.png", "card6.jpg"]
let $boardCards = document.querySelectorAll('.card')
let cardsSelected = []
let rounds = 0

setGame()
handleGame()


function setGame() {
    let fullCards = cards.concat(cards)
    let cardsSuffled = shuffleCards(fullCards)
    $boardCards.forEach((card, index) => {
        let node = document.createElement('img')
        node.src = `./images/${cardsSuffled[index]}`
        node.classList.add("card-img-top")
        node.id = cardsSuffled[index]
        card.appendChild(node)
    })
}

 function handleGame() {
    $boardCards = document.querySelectorAll('.card')
 
    if (cardsSelected.length === 2) {
        deactivatUserTurn()
        compareCards()
    } else {
        activateUserTurn()
    }

    if ($boardCards.length === 0) {
        endGame()
    }

}

function deactivatUserTurn() {
    $boardCards.forEach(card => {
        card.onclick = function (e) {
        }
    })
}

function activateUserTurn() {
     $boardCards.forEach(card => {
        card.onclick = function (event) {
            clickOnCard(event.target)
            userTurn(event)
        }
    })
}


function userTurn(event) {
    if (cardsSelected.includes(event.target.nextElementSibling)) {
        return
    }
    cardsSelected.push(event.target.nextElementSibling)
     handleGame()
}


 
function compareCards() {
    rounds++
    if (cardsSelected[0].src === cardsSelected[1].src) {
         setTimeout(() => {
            cardsSelected[0].parentNode.remove()
            cardsSelected[1].parentNode.remove()
            cardsSelected = []
            handleGame()
        }, 500);

    } else {
       setTimeout(() => {
            cardsSelected[0].previousElementSibling.classList.remove("hide")
            cardsSelected[1].previousElementSibling.classList.remove("hide")
            cardsSelected = []
            activateUserTurn()
        }, 500);
    }

}

function clickOnCard(card) {
    if (!card.classList.contains('hide')) {
        card.classList.add("hide")
   }
}

function endGame() {
    document.getElementById('message').innerHTML = `
    <h2 class=" w-100 text-center  " id="endGame_text"> 
    You have finished the game in ${rounds}        
    </h2>
    <button class="mx-auto btn game-button my-2 " id="endGame_button"> Start Again </button>
    `

    document.getElementById("endGame_text").innerText =
        `You finished the game in ${rounds} Rounds`

    document.getElementById('endGame_button').onclick = function () {
        location.reload();
        return false;
    }
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = cards[i]
        cards[i] = cards[j]
        cards[j] = temp
    }
    return cards
}