//  select canvas 
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

//  game vars and const 
let running = true
let frames = 0

// load sprite
const knight = new Image()
knight.src = "img/adventurer-v1.5-Sheet.png"

const knightInverse = new Image()
knightInverse.src = "img/02095342_adventurer-v1.5-Sheetcopy.png"

const sprite = new Image();
sprite.src = "img/sprite.png"

const hearts = new Image()
hearts.src = "img/heart_animated_2.png"

const enemySprite = new Image()
enemySprite.src = "img/demon-attack.png"


// Sound effects 
const jumpingSFX = new Audio()
jumpingSFX.volume = 0.3
jumpingSFX.src = "img/jumping-sfx.mp3"

const walkingSFX = new Audio()
walkingSFX.volume = 0.3
walkingSFX.src = "img/walking-sfx.mp3"

const slashSFX = new Audio()
slashSFX.volume = 0.3
slashSFX.src = "img/sword-sfx.mp3"

const music = new Audio()
music.volume = 0.0
music.src = "img/Dark Cloud Soundtrack - The Village Festival.mp3"

// game current 
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

document.addEventListener("click", function (e) {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            music.play()
            break;
        case state.game:
            break;
        case state.over:
            state.current = state.getReady;
            break;

    }
})




// background infinite

var bg = new Image();
bg.src = "img/bg2.png";


let background = {
    src: "img/bg2.png",
    x: 0,
    y: 0
}

// controller 

let controller = {


    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                jumpingSFX.play()
                break;
            case 39:// right key
                controller.right = key_state;
                break;
            case 32:// spacebar
                controller.space = key_state;
                break;
        }

    }

};


let jumped = false
let slashed = false


// const enemy = {


//     animation: [
//     ],

//     w: 200,
//     h: 200,
//     x: 200,
//     y: 100,

//     frame: 0,

//     draw: function () {
//         let enemy = this.animation[this.frame]
//         ctx.drawImage(enemySprite, enemy.sX, enemy.sY, this.w, this.h, this.x, this.y, 300,300 )
//     },


//     update: function () {
//         this.period = state.current == state.getReady ? 10 : 10;
//         this.frame += frames % this.period == 0 ? 1 : 0;
//         this.frame = this.frame % 10;
//     }

// }


const hero = {


    animation: [
        [{ sX: 50, sY: 40 },
        { sX: 100, sY: 40 },
        { sX: 150, sY: 40 },
        { sX: 200, sY: 40 },
        { sX: 250, sY: 40 },
        { sX: 300, sY: 40 }],

        [{ sX: 0, sY: 0 },
        { sX: 50, sY: 0 },
        { sX: 100, sY: 0 },
        { sX: 150, sY: 0 },
        { sX: 100, sY: 0 },
        { sX: 50, sY: 0 }],

        [{ sX: 150, sY: 80 },
        { sX: 150, sY: 80 },
        { sX: 150, sY: 80 },
        { sX: 200, sY: 80 },
        { sX: 200, sY: 80 },
        { sX: 200, sY: 80 }],

        [{ sX: 285, sY: 40 },
        { sX: 235, sY: 40 },
        { sX: 185, sY: 40 },
        { sX: 135, sY: 40 },
        { sX: 85, sY: 40 },
        { sX: 35, sY: 40 }],

        [{ sX: 150, sY: 480 },
        { sX: 300, sY: 480 },
        { sX: 0, sY: 520 },
        { sX: 50, sY: 520 },
        { sX: 150, sY: 480 },
        { sX: 300, sY: 480 }]


    ],

    w: 40,
    h: 40,
    x: 20,
    y: 150,

    frame: 0,


    speed: 0,
    gravity: 0.25,
    jump: 6.5,

    chests: 0,
    heath: 5,

    draw: function () {

        if (controller.up && this.y < 340) {
            let hero = this.animation[2][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.right) {
            let hero = this.animation[0][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.left) {
            let hero = this.animation[3][this.frame]
            ctx.drawImage(knightInverse, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        else if (controller.space) {
            let hero = this.animation[4][this.frame]
            ctx.drawImage(knight, hero.sX, hero.sY, 60, 40, this.x, this.y - 20, 75, 95)
        }

        else {
            let hero = this.animation[1][this.frame];
            ctx.drawImage(knight, hero.sX, hero.sY, this.w, this.h, this.x, this.y, 60, 80)
        }

        // switch (this.heath) {

        //     case (this.heath = 4):// left key
        //         ctx.drawImage(hearts, sX, sY, w, h, x, y, 60, 80);
        //         break;
        //     case (this.heath = 3):// left key
        //         ctx.drawImage(hearts, sX, sY, w, h, x, y, 60, 80);
        //         break;
        //     case (this.heath = 2):// left key
        //         ctx.drawImage(hearts, sX, sY, w, h, x, y, 60, 80);
        //         break;
        //     case (this.heath = 1):// left key
        //         ctx.drawImage(hearts, sX, sY, w, h, x, y, 60, 80);
        //         break;
        //     case (this.heath = 0):// left key
        //         ctx.drawImage(hearts, sX, sY, w, h, x, y, 60, 80);
        //         break;
        // }
    },


    jumping: function () {
        this.speed = - this.jump
        jumped = true
    },

    right: function () {
        this.x += 0.5
    },

    left: function () {
        this.x -= 3
    },

    slash: function () {
        this.x += 3
    },

    // collision: function() {
    //     if(this.x + this.w > enemy.x && this.x < enemy.w && this.y + this.w > enemy.y) {
    //         this.x -= 20;
    //     }
    // },

    update: function () {
        this.period = state.current == state.getReady ? 10 : 10;
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % 6;

        if (state.current == state.getReady) {
            this.y = 360
        }
        else {
            this.speed += this.gravity;
            this.y += this.speed;
            if (this.y >= 360) {
                this.y = 360
                jumped = false
                // if (state.current == state.game) {
                //     state.current = state.over
                // }
            }
        }
    }
}

// get ready 

const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    }
}

// 

const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: 90,

    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    }
}


//  draw 


function draw() {
    ctx.fillStyle = "rgb(21,24,37)"
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    for (var w = 0; w < 1000; w++) {
        ctx.drawImage(bg, (w * cvs.width * 2.2) + background.x, 0);
        //context.drawImage(bg, w*background.x, 0); trippy

    }
    // enemy.draw()
    hero.draw()
    getReady.draw()
    gameOver.draw()

}

//  update 

function update() {
    // enemy.update()
    hero.update()
    // fg.update()
}

//  loop 

function loop() {
    update();
    draw();
    frames++;
    if (controller.up && jumped == false) {
        hero.jumping()
        jumpingSFX.play();
    }

    else if (controller.right) {
        hero.right()
        background.x -= 3;
        if (jumped == false) {
            walkingSFX.play()
        }
    }

    else if (controller.left) {
        hero.left()
        background.x += 3;
        if (jumped == false) {
            walkingSFX.play()
        }
    }

    else if (controller.space && slashed == false) {
        hero.slash()
        background.x -= 4
        slashSFX.play()
    }

    if (hero.x < 32) {

        hero.x = 32;

    } else if (hero.x > 550) {// if rectangle goes past right boundary

        hero.x = 550;

    }

    requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop);
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);