const states = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score')
    },
    cardSprites:{
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions:{
        button: document.getElementById('next-duel')
    },

}

const playersSides = {
    player1: 'player-cards',
    computer: 'computer-cards',
}

const pathImages = './src/assets/icons/'
const cardData = [
    {
        id:0,
        name:'Dragão Branco de Olhos Azuis',
        type: 'Papel',
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2],

    },
    {
        id:1,
        name:'Mago Negro',
        type: 'Pedra',
        img: `${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0],

    },
    {
        id:2,
        name:'Exodia',
        type: 'Tesoura',
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1],

    }
]

 async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

 async function createCardImage(IdCard,fieldSide){
    const cardImage = document.createElement('img')
    cardImage.setAttribute('height', '100px')
    cardImage.setAttribute('src', `${pathImages}card-back.png`)
    cardImage.setAttribute('data-id', IdCard)
    cardImage.classList.add('card')

    if(fieldSide === playersSides.player1){
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'))
        })
    }

    cardImage.addEventListener('mouseover',() => {
        drawSelectedCard(IdCard)
    })

    return cardImage


}

 async function drawCards(cardNumbers, fieldSide){
    for (let i = 0; i < cardNumbers.length; i++) {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
        
    }
}

function start(){

drawCards(5,playersSides.player1)
drawCards(5,playersSides.computer)

}

start()