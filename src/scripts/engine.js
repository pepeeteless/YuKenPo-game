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
    playersSides: {
        player1: 'player-cards',
        player1BOX: document.querySelector('#player-cards'),
        computer: 'computer-cards',
        computerBOX:document.querySelector('#computer-cards')
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions:{
        button: document.getElementById('next-duel')
    },

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

    if(fieldSide === states.playersSides.player1){
        cardImage.addEventListener('mouseover',() => {
            drawSelectedCard(IdCard)     
    })
        
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'))
        })
    }



    return cardImage


}


async function setCardsField(cardId){
    await removeAllCardsImages()
    
    let computerCardId = await getRandomCardId()
    
    states.fieldCards.player.style.display = 'block'
    states.fieldCards.computer.style.display = 'block'

    states.cardSprites.avatar.src = ''
    states.cardSprites.name.innerText = ''
    states.cardSprites.type.innerText = ''
    
    states.fieldCards.player.src = cardData[cardId].img
    states.fieldCards.computer.src = cardData[computerCardId].img
    
    let duelResults = await checkDuelResults(cardId, computerCardId)
    
    await updateScore()
    
    await drawButton(duelResults)
}

async function updateScore(){
    states.score.scoreBox.innerText = `Ganhou: ${states.score.playerScore} | Perdeu: ${states.score.computerScore}`
}

async function drawButton(text){
    states.actions.button.innerText = text
    states.actions.button.style.display = 'block'
}

async function checkDuelResults(playerCardId,computerCardId){
    let duelResults = 'EMPATE'
    let playerCard = cardData[playerCardId]
    
    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = 'GANHOU'
        states.score.playerScore++
        await playAudio('win')
    }
    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults= 'PERDEU'
        states.score.computerScore++
        await playAudio('lose')
    }
    
    return duelResults
}

async function removeAllCardsImages(){
    let {computerBOX,player1BOX } = states.playersSides
    let imgElements = computerBOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
    
    imgElements = player1BOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
}

async function drawSelectedCard(index){
    states.cardSprites.avatar.src = cardData[index].img
    states.cardSprites.name.innerText = cardData[index].name
    states.cardSprites.type.innerText = 'Atributo: ' + cardData[index].type
}

async function drawCards(cardNumbers, fieldSide){
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)
        
        document.getElementById(fieldSide).appendChild(cardImage)
        
    }
}
async function resetDuel(){
    states.cardSprites.avatar.src = ''
    states.actions.button.style.display = 'none'

    states.fieldCards.player.style.display = 'none'
    states.fieldCards.computer.style.display = 'none'

    start()
}


async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play()

}

function start(){
    
    states.fieldCards.player.style.display = 'none'
    states.fieldCards.computer.style.display = 'none'

    drawCards(5,states.playersSides.player1)
    drawCards(5,states.playersSides.computer)
    
    const bgm = document.getElementById('bgm')
    bgm.play()

}

start()