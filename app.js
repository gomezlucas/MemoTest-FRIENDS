//Cards
let $cards = ["card1.jpg", "card2.jpg", "card3.jpg", "card4.jpg", "card5.png", "card6.jpg"]
let $boardCards = document.querySelectorAll('.card')
let cardsSelected = []
let rounds = 0

setGame()
handleGame()

// Set Game 
function setGame() {
    let fullCards = $cards.concat($cards)
    let cardsSuffled = shuffleCards(fullCards) // array with images
    $boardCards.forEach((card, index) => {
        let node = document.createElement('img')
        node.src = `./images/${cardsSuffled[index]}`
        node.classList.add("card-img-top")
        node.id = cardsSuffled[index]
        card.appendChild(node)
    })
}

// playGame 

function handleGame() {
    $boardCards = document.querySelectorAll('.card')
    console.log($boardCards.length)

    if (cardsSelected.length === 2) {
        desactivatUserTurn()
        compareCards()
    } else {
        activateUserTurn()
    }

    if ($boardCards.length === 0) {
        endGame()
    }

}



//Desactivate User Turn 
function desactivatUserTurn() {
    $boardCards.forEach(card => {
        card.onclick = function (e) {
        }
    })
}


//Activate User Turn 
function activateUserTurn() {
    console.log('entro a activate turn')
    $boardCards.forEach(card => {
        card.onclick = function (event) {
            clickOnCards(event.target)
            userTurn(event)
        }
    })
}

//userTurn
function userTurn(event) {

    if (cardsSelected.includes(event.target.nextElementSibling)) {
        return
    }

    cardsSelected.push(event.target.nextElementSibling)
    console.log(cardsSelected)
    handleGame()
}


//Compare Cards 
function compareCards() {
    rounds++
    if (cardsSelected[0].src === cardsSelected[1].src) {
        setTimeout(() => {
            cardsSelected[0].parentNode.remove()
            cardsSelected[1].parentNode.remove()
            cardsSelected = []
            handleGame()
        }, 1000);

    } else {
        setTimeout(() => {
            cardsSelected[0].previousElementSibling.classList.remove("hide")
            cardsSelected[1].previousElementSibling.classList.remove("hide")
            cardsSelected = []
            activateUserTurn()
        }, 1000);
    }

}


//Click on Cards
function clickOnCards(card) {
    if (card.classList.contains('hide')) {
        //      card.parentNode.classList.remove("hide")
    } else {
        card.classList.add("hide")
    }
}


// End Game 
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


//Algorithm to shuffle Cards
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = cards[i]
        cards[i] = cards[j]
        cards[j] = temp
    }
    return cards
}


