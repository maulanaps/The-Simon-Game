gamePattern = []
userPattern = []
buttonColors = ['red', 'blue', 'green', 'yellow']
started = false
level = 1
randomChoosenColor = ''

// START GAME
$('html').on('keypress', function(){
    if (!started){
        started = true
        nextSeq()
        $('h1').text('Level ' + level)
    }
})


$('.btn').on('click', function(){
    if (started){
        var btnID = '#' + this.id

        // grey bg flash 
        $(btnID).addClass('pressed')
        setTimeout(function(){
            $(btnID).removeClass('pressed')
        }, 100)
        playSound(btnID)

        // check answer
        userPattern.push(this.id)
        checkAnswer()
    }

})


function checkAnswer(){
    sliceGamePattern = gamePattern.slice(0, userPattern.length)
    for (var i = 0; i < userPattern.length; i++){
        if (userPattern[i] != sliceGamePattern[i]){
            // game over
            gameOver()
            return
        }
    }

    // continue
    if (userPattern.length == gamePattern.length){
        continueGame()
    }
}


function continueGame(){
    setTimeout(nextSeq, 500)
    userPattern = []

    // update level
    level++
    $('h1').text('Level ' + level)
}


function gameOver(){
    // flash html body
    $('body').addClass('game-over')
    setTimeout(function(){
        $('body').removeClass('game-over')
    }, 200)

    // play wrong sound
    document.querySelector('#wrong-audio').play()

    // restart game
    $('h1').text('Game Over, Press Any Key to Restart')
    started = false
    level = 1
    gamePattern = []
    userPattern = []
}


function nextSeq(){
    // choose random color
    randomNumber = Math.floor(Math.random() * 4)
    randomChoosenColor = buttonColors[randomNumber]

    // animate choosen color
    animateBtn(randomChoosenColor)

    // save choosen color to gamePattern
    gamePattern.push(randomChoosenColor)
}


function animateBtn(nextColor){
    var btnID = '#' + nextColor

    // flash and sound
    $(btnID).fadeOut(100).fadeIn(100)
    playSound(btnID)
}


function animateGamePattern(pattern){
    var i = 0
    var myInterval = setInterval(() => {
        if(i < pattern.length){
            animateBtn(pattern[i])
            i++
        }
        else {
            clearInterval(myInterval)
        }
    }, 500);
}


function playSound(btnID){
    document.querySelector(btnID + ' audio').play()
}
