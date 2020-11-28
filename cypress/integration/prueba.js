
 
const URL = `http://127.0.0.1:8080/`
const NUMERO_CARDS = 12

context('memotestfriends', () => {
    before(() => {
        cy.visit(URL);
    });

    it('Chequea que la web cargue las Cards con las fotos', () => {
        cy.get('.container').find('.card-img-top').should('have.length', NUMERO_CARDS)
    })


    it("Chequea que los cuadros sean aleatorios", () => {

        let srcOriginales = []
        cy.get(".card-img-top").then((cards) => {
            cards.each((index, card) => {
                srcOriginales.push(card.src)
            })
        })

        cy.visit(URL)
        let srcNuevas = []
        cy.get(".card-img-top").then(cards => {
            cards.each((index, card) => {
                srcNuevas.push(card.src)
            })
        })
        cy.wrap(srcOriginales).should('not.deep.equal', srcNuevas)
    })


    describe("Resuelve el juego", () => {
        
        let mapaDePares, listaDePares
        
        it("elige una combinacion erronea", () => {
            cy.clock();
            cy.get(".card").then(cards => {
                mapaDePares = obtenerParesDeCuadores(cards.children())
                listaDePares = Object.values(mapaDePares)
                listaDePares[1][0].click()
                listaDePares[2][2].click()
            })
            cy.get('.card').should('have.length', NUMERO_CARDS)
            cy.tick(1000)

        })

        it("Finaliza el juego", () => {
            cy.clock();

            cy.get('.card').should('have.length', NUMERO_CARDS)
         
            listaDePares.forEach(card => {
                cy.get(card[0]).click()
                cy.get(card[2]).click()
                cy.tick(1000)
            })

            cy.get('.card').should('have.length', 0)
        })

        it("Muestra mensaje", ()=>{
            cy.get('#message').should('be.visible').contains(`You finished the game in 7 Rounds`)
        })
    })
});

//Obtiene pares de Cards iguales y sus respectivas cartas que las cubren
function obtenerParesDeCuadores(cards) {
    const pares = {}
    let previousCard
    cards.each((index, card) => {
        if (index % 2) {
            if (pares[card.id]) {
                pares[card.id].push(previousCard)
                pares[card.id].push(card)
            } else {
                pares[card.id] = []
                pares[card.id].push(previousCard)
                pares[card.id].push(card)
            }
        } else {
            previousCard = card
        }
    })

    return pares
}
