controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spieler.left >= spieler.width) {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        spieler.left = spieler.left - spieler.width
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spieler.right <= scene.screenWidth() - spieler.width) {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        spieler.right = spieler.right + spieler.width
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
    }
})
function reduziereBudget (num: number) {
    budget = budget - num
    budgetAktualisieren()
    if (budget < 0) {
        game.gameOver(false)
    }
    if (budget <= 50) {
        game.gameOver(true)
    }
}
function budgetAktualisieren () {
    budgetSprite.setText("" + convertToText(budget) + " Eur")
    budgetSprite.top = 5
    budgetSprite.right = scene.screenWidth() - 5
}
let budget = 0
let budgetSprite: TextSprite = null
let spieler: Sprite = null
game.setGameOverEffect(true, effects.confetti)
game.setGameOverPlayable(true, music.melodyPlayable(music.baDing), false)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverPlayable(false, music.melodyPlayable(music.bigCrash), false)
spieler = sprites.create(assets.image`spieler`, SpriteKind.Player)
spieler.left = spieler.width * 4
spieler.bottom = scene.screenHeight()
budgetSprite = textsprite.create("")
budget = 2640
budgetAktualisieren()
