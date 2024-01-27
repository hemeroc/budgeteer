namespace SpriteKind {
    export const menue = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(istSpielGestartet)) {
        spielStarten()
    } else {
        if (istSpielPausiert) {
            sprites.destroyAllSpritesOfKind(SpriteKind.menue)
            istSpielPausiert = false
        } else {
            istSpielPausiert = true
            menueAnzeigen()
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (istSpielGestartet && !(istSpielPausiert)) {
        if (spriteSpieler.left >= spriteSpieler.width) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            spriteSpieler.left = spriteSpieler.left - spriteSpieler.width
        } else {
            music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
        }
    }
})
function reduziereLeben () {
    leben = leben - 1
    budgetAktualisieren()
    spriteLeben.setText("x" + convertToText(leben))
    if (leben <= 0) {
        game.gameOver(false)
    }
}
function spielStarten () {
    istSpielGestartet = true
    sprites.destroyAllSpritesOfKind(SpriteKind.menue)
    spriteSpieler = sprites.create(assets.image`spieler`, SpriteKind.Player)
    spriteSpieler.left = spriteSpieler.width * 4
    spriteSpieler.bottom = scene.screenHeight()
    leben = 10
    spriteLeben = textsprite.create("x" + convertToText(leben), 0, 15)
    spriteLeben.left = 3
    spriteLeben.top = 3
    spriteLeben.setIcon(assets.image`leben`)
    spriteBudget = textsprite.create("", 0, 15)
    budget = 2640
    budgetAktualisieren()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (istSpielGestartet && !(istSpielPausiert)) {
        if (spriteSpieler.right <= scene.screenWidth() - spriteSpieler.width) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            spriteSpieler.right = spriteSpieler.right + spriteSpieler.width
        } else {
            music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
        }
    }
})
function menueAnzeigen () {
    spriteMenueHintergrund = sprites.create(assets.image`menue`, SpriteKind.menue)
    spriteMenueHintergrund.left = 0
    spriteMenueHintergrund.top = 0
    spriteMenueText = textsprite.create("", 0, 15)
    spriteMenueText.setKind(SpriteKind.menue)
    spriteMenueText.setIcon(assets.image`pressA`)
    spriteMenueText.setMaxFontHeight(16)
    spriteMenueText.left = 45
    spriteMenueText.top = 15
    if (istSpielPausiert) {
        spriteMenueText.setText("PAUSE")
    } else {
        spriteMenueText.setText("START")
    }
    spriteMenueSparen = textsprite.create("200 EUR", 0, 15)
    spriteMenueSparen.setKind(SpriteKind.menue)
    spriteMenueSparen.setIcon(assets.image`sparen`)
    spriteMenueSparen.left = 55
    spriteMenueSparen.top = 50
    spriteMenueEssen = textsprite.create("25 EUR", 0, 15)
    spriteMenueEssen.setKind(SpriteKind.menue)
    spriteMenueEssen.setIcon(assets.image`essen`)
    spriteMenueEssen.left = 20
    spriteMenueEssen.top = 70
    spriteMenueSpass = textsprite.create("50 EUR", 0, 15)
    spriteMenueSpass.setKind(SpriteKind.menue)
    spriteMenueSpass.setIcon(assets.image`spass`)
    spriteMenueSpass.left = 20
    spriteMenueSpass.top = 90
    spriteMenueKleidung = textsprite.create("100 EUR", 0, 15)
    spriteMenueKleidung.setKind(SpriteKind.menue)
    spriteMenueKleidung.setIcon(assets.image`kleidung`)
    spriteMenueKleidung.left = 80
    spriteMenueKleidung.top = 70
    spriteMenueWohnen = textsprite.create("500 EUR", 0, 15)
    spriteMenueWohnen.setKind(SpriteKind.menue)
    spriteMenueWohnen.setIcon(assets.image`wohnen`)
    spriteMenueWohnen.left = 80
    spriteMenueWohnen.top = 90
}
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
    spriteBudget.setText("" + convertToText(budget) + " EUR")
    spriteBudget.right = scene.screenWidth() - 3
    spriteBudget.top = 3
}
let spriteMenueWohnen: TextSprite = null
let spriteMenueKleidung: TextSprite = null
let spriteMenueSpass: TextSprite = null
let spriteMenueEssen: TextSprite = null
let spriteMenueSparen: TextSprite = null
let spriteMenueText: TextSprite = null
let spriteMenueHintergrund: Sprite = null
let budget = 0
let spriteBudget: TextSprite = null
let spriteLeben: TextSprite = null
let leben = 0
let spriteSpieler: Sprite = null
let istSpielPausiert = false
let istSpielGestartet = false
scene.setBackgroundColor(1)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverPlayable(true, music.melodyPlayable(music.baDing), false)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverPlayable(false, music.melodyPlayable(music.bigCrash), false)
istSpielGestartet = false
istSpielPausiert = false
menueAnzeigen()
